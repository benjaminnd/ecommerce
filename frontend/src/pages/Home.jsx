import React from "react";

const Home = () => {
  return (
    <>
      <div className="topBanner">
        <div className="row">
          <div className="col-2">
            <h1>
              Change your Cases, <br />
              Change your Story.
            </h1>
            {/* <p>
              When words becomes unclear, I shall focus with photographs.
              <br />
              When Images becomes inadequate, I shall be content with silence.
            </p> */}
            <a href="" className="btn">
              Explore Now &#8594;
            </a>
          </div>
          <div className="col-2">
            <img src="./360.png" alt="" />
          </div>
        </div>
      </div>
      <div className="categories">
        <div className="smallContainer">
          <div className="row">
            <div className="col-3">
                <div className="content">
                    <a href="/" target="_blank">
                        <div className="content-overlay"></div>
                        <img className="content-image" src="./iphone_transparent.png"/>
                        <div className="content-details fadeIn-bottom">
                            <h3 className="content-title">View Iphone cases</h3>
                        </div>
                    </a>
                </div>
            </div>
            <div className="col-3">
                <div className="content">
                    <a href="/" target="_blank">
                        <div className="content-overlay"></div>
                        <img className="content-image" src="./airpod home page.png"/>
                        <div className="content-details fadeIn-bottom">
                            <h3 className="content-title">View Airpod cases</h3>
                        </div>
                    </a>
                </div>
            </div>
          </div>
        </div>
      </div>
      <div className="smallContainer">
        <h2 className="title">Featured Products</h2>
        <div className="row">
          <div className="col-4">
            <a href="product-details.html">
              <img src="./avocado.png" alt="" />
            </a>
            <a href="product-details.html">
              <h4>Avocado Airpod Case</h4>
            </a>
            <div className="rating">
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star-o"></i>
            </div>
            <p>Rs.3695</p>
          </div>
          <div className="col-4">
            <img src="images/pro2-Polo Ralph Lauren-12990.png" alt="" />
            <h4>Polo Ralph Lauren</h4>
            <div className="rating">
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star-half-o"></i>
            </div>
            <p>Rs.12990</p>
          </div>
          <div className="col-4">
            <img src="images/pro3-allen solly - 2369.png" alt="" />
            <h4>Allen Solly Shirt</h4>
            <div className="rating">
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star-o"></i>
            </div>
            <p>Rs.2369</p>
          </div>
          <div className="col-4">
            <img src="images/pro4-h&m-1499.png" alt="" />
            <h4>H&M SweatShirt</h4>
            <div className="rating">
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star-half-o"></i>
              <i className="fa fa-star-o"></i>
            </div>
            <p>Rs.1499</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
