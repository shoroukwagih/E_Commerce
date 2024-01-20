import React from "react";
import { useSelector } from "react-redux";
import CartCard from "./CartCard";
import exampleImage from "../assest/image/empty-cart.png";

const Cart = () => {
  const cartList = useSelector((state) => state.quantity.quantityList);

  const calculateTotal = () => {
    return cartList.reduce((total, item) => total + item.price * item.quantity, 0);
  };

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
            {cartList.map((product) => (
              <div key={product.id} className="col-12" style={{ margin: "10px" }}>
                <CartCard  productId={product.id} products={product} />
              </div>
            ))}
          </div>
          <div className="container my-2 mx-auto d-flex justify-content-center align-items-center ">
            <p className="bg-success text-light fs-5 fw-bold py-2 px-3 my-3">
              Total = ${calculateTotal()}
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
