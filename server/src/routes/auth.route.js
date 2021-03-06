import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import gravatar from "gravatar";
import User from "../models/Users.js";
import Payment from "../models/Payment.js";
import UserAuth from "../middleware/auth.js";
import RegisterValidator from "../middleware/register.js";
import async from "async";
import Product from "../models/Product.js";

const UserRouter = express.Router();

//@route GET api/users
//@desc Get all usersgit
//@access Private

UserRouter.get("/users", async (req, res) => {
  try {
    console.log("get users");
    const users = await User.find();
    res.json(users);
    console.log(users);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
});

//@route GET api/user
//@desc User Info
//@access Private

UserRouter.get("/", UserAuth, async (req, res) => {
  try {
    console.log("get user");
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
    console.log(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
});

//USER REGISTER
//Register user POST api/user/register; PUBLIc
UserRouter.post("/register", RegisterValidator, async (req, res) => {
  const { name, email, password } = req.body;

  try {
    //If email not existed get image
    const avatar = gravatar.url(email, {
      s: "250",
      r: "pg",
      d: "mm",
    });
    //Create User
    let role = 1; //let tester create admin account
    let user = new User({
      name,
      email,
      avatar,
      password,
      role,
    });

    const salt = await bcrypt.genSalt(10);
    //save password
    user.password = await bcrypt.hash(password, salt);
    //save user in sb
    await user.save();
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: 360000,
      },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

//USER LOGIN
UserRouter.post("/login", async (req, res) => {
  //get email and passwsord from request body
  const { email, password } = req.body;

  try {
    let user = await User.findOne({
      email,
    });
    //If not found
    if (!user) {
      return res.status(400).json({
        errors: [
          {
            msg: "User does not exist. Please try another credentials",
          },
        ],
      });
    }
    //create payload
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: 360000,
      },
      (err, token) => {
        if (err) throw err;
        res.json({
          token,
        });
      }
    );
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
});

UserRouter.post("/addToCart", UserAuth, (req, res) => {
  console.log(req.user);
  User.find({ _id: req.user.id }, (err, userInfo) => {
    let duplicate = false; //this flags whether the product id is already added to cart
    console.log("User: ", userInfo);
    userInfo[0].cart.forEach((cartInfo) => {
      console.log(cartInfo);
      if (cartInfo.productId === req.query.productId) {
        duplicate = true;
      }
    });
    //if the item is already in cart increment the quantity
    if (duplicate) {
      console.log("duplicate");
      User.findOneAndUpdate(
        { _id: req.user.id, "cart.productId": req.query.productId },
        { $inc: { "cart.$.quantity": 1 } },
        { new: true },
        (err, user) => {
          if (err) return res.json({ success: false, err });
          res.status(200).json(user);
        }
      );
    } else {
      //if the product is added the first time push a whole new cart object to cart array
      console.log("new cart");
      User.findOneAndUpdate(
        { _id: req.user.id },
        {
          $push: {
            cart: {
              productId: req.query.productId,
              quantity: 1,
              date: Date.now(),
            },
          },
        },
        { new: true },
        (err, user) => {
          if (err) return res.json({ success: false, err });
          res.status(200).json(user);
        }
      );
    }
  });
});

UserRouter.post("/successPay", UserAuth, (req, res) => {
  let history = [];
  let transaction = {};
  //Put payment info from Paypal into Payment Collection
  req.body.cartDetail.forEach((item) => {
    history.push({
      purchaseDate: Date.now(),
      name: item.name,
      id: item._id,
      price: item.price,
      quantity: item.quant,
    });
  });
  transaction.data = req.body.paymentData;

  transaction.products = history;

  transaction.user = {
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };

  //Put payment information in the User Collection

  User.findOneAndUpdate(
    { _id: req.user.id },
    { $push: { history: history }, $set: { cart: [] } },
    { new: true },
    (err, user) => {
      if (err) return res.json({ success: false, err });

      const payment = new Payment(transaction);
      payment.save((err, payment) => {
        if (err) return res.json({ success: false, err });
        //increase sold field of the product
        let products = [];
        payment.products.forEach((item) => {
          products.push({ id: item.id, quantity: item.quantity });
        });

        //Increase the amount of number for sold information
        async.eachSeries(
          products,
          (item, callback) => {
            Product.findOneAndUpdate(
              { _id: item.id },
              { $inc: { sold: item.quantity } },
              { new: false },
              callback
            );
          },
          (err) => {
            if (err) return res.json({ success: false, err });
            res.status(200).json({
              success: true,
              cart: user.cart,
              updatedCart: [],
            });
          }
        );
      });
    }
  );
});

UserRouter.post("/successPayGuest", (req, res) => {
  let history = [];
  let transaction = {};
  //Put payment info from Paypal into Payment Collection
  req.body.cartDetail.forEach((item) => {
    history.push({
      purchaseDate: Date.now(),
      name: item.name,
      id: item._id,
      price: item.price,
      quantity: item.cartQuant,
    });
  });
  transaction.data = req.body.paymentData;

  transaction.products = history;

  transaction.user = {
    name: "Guest",
  };

  //Save guest payment
  const payment = new Payment(transaction);
  payment.save((err, payment) => {
    if (err) return res.json({ success: false, err });
    //increase sold field of the product
    let products = [];
    payment.products.forEach((item) => {
      console.log(item);
      products.push({ id: item.id, quantity: item.quantity });
    });
    //Increase the amount of number for sold information
    async.eachSeries(
      products,
      (item, callback) => {
        Product.findOneAndUpdate(
          { _id: item.id },
          { $inc: { sold: item.quantity } },
          { new: false },
          callback
        );
      },
      (err) => {
        if (err) return res.json({ success: false, err });
        res.status(200).json({
          success: true,
          updatedCart: [],
        });
      }
    );
  });
});

UserRouter.post("/removeCartItem", UserAuth, (req, res) => {
  console.log("Removing...", req.user.id, req.query);
  User.find({ _id: req.user.id }, (err, user) => {
    console.log(user);
    User.findOneAndUpdate(
      { _id: user[0]._id },
      { $pull: { cart: { productId: req.query.cartItem } } },
      { new: true },
      (err, user) => {
        if (err)
          return res.json({
            success: false,
            error: "Cannot retrieve user information",
          });
        console.log("REMOVED");
        res.status(200).json({
          success: true,
          user: user,
        });
      }
    );
  });
});

UserRouter.post("/changeItem", UserAuth, (req, res) => {
  console.log("Changing", req.user.id, req.query.cartItem, req.query.newValue);
  User.find({ _id: req.user.id }, (err, doc) => {
    if (err) return res.status(400).send("Server error");
    const userCart = doc[0].cart;
    console.log("Before change", userCart);
    const index = userCart.findIndex(
      (item) => item.productId == req.query.cartItem
    );
    userCart[index].quantity = +req.query.newValue;
    console.log("After change", userCart);

    User.findOneAndUpdate(
      { _id: req.user.id },
      { $set: { cart: userCart } },
      { new: true },
      (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.json({ success: true, user: doc });
      }
    );
  });
});

export default UserRouter;
