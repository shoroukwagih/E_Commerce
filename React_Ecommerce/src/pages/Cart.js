// Cart.js
import React from "react";
import { useSelector } from "react-redux";
import CartCard from "./CartCard";
import exampleImage from "../assest/image/empty-cart.png";

const Cart = () => {
  const cartList = useSelector((state) => state.counter.cartList);

  return (
    <>
      {cartList.length === 0 ? (
        <>
          <div className="d-flex align-items-center justify-content-center">
            <img src={exampleImage} alt="Empty Cart" />
          </div>
        </>
      ) : (
        <>
          <h1 className="center text-success mt-5">Cart List</h1>
          <div className="d-flex flex-wrap align-items-center g-3">
            {cartList.map((productId) => (
              <div key={productId} className="col-12" style={{ margin: "10px" }}>
                <CartCard productId={productId} />
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
