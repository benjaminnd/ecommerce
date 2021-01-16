import React from "react";
import ImageCarousel from "../imageSlider/ImageCarousel";

function Card({ title, productId, price, description, images }) {
  const printId = () => console.log("product Id ", productId);
  return (
    <div className="card my-4 px-2 w-full sm:my-4 md:w-1/2 md:my-2 lg:my-4 lg:px-4 lg:w-1/3">
      {/* <article className="overflow-hidden rounded-lg shadow-lg"> */}

      <a href={`/product/${productId}`}>
        <ImageCarousel images={images} />
      </a>

      {/* <header className="flex items-center justify-between leading-tight p-2 md:p-4"> */}
      <h4>
        <a
          className="no-underline hover:no-underline hover:text-black text-black"
          href={`/product/${productId}`}
        >
          {title}
        </a>
      </h4>
      <p className="text-grey-darker text-sm">${price}</p>
      {/* </header> */}

      {/* <footer className="flex items-center justify-between leading-none p-2 md:p-4"> */}
      <a
        className="flex items-center no-underline hover:underline text-black"
        href={`/product/${productId}`}
      >
        {/*    */}
        <p className="">{description}</p>
      </a>
      {/* <a className="no-underline text-grey-darker hover:text-red-dark" href="#">
                    <span className="hidden">Like</span>
                    <i className="fa fa-heart"></i>
                </a> */}
      {/* </footer> */}

      {/* </article> */}
    </div>
  );
}

export default Card;
