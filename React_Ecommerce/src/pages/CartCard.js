import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from "react-redux";
import { decreaseCounter, increaseCounter } from "../store/slices/counter";
import { axiosInstance } from "../apis/config";

const CartCard = ({ productId }) => {
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1); // Initialize quantity with 1
    const dispatch = useDispatch();
    const cartList = useSelector((state) => state.counter.cartList);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get(""); // Update the API endpoint
                const fetchedProduct = response.data.products.find((p) => p.id === productId);

                if (fetchedProduct) {
                    setProduct(fetchedProduct);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [productId]);

    const increase = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };

    const decrease = () => {
        if (quantity > 1) {
            setQuantity((prevQuantity) => prevQuantity - 1);
        }
    };

    const handleButtonClick = () => {
        if (cartList.indexOf(product.id) === -1) {
            dispatch(increaseCounter(product.id));
        } else {
            dispatch(decreaseCounter(product.id));
        }
    };

    return (
        <div className="container my-3">
            <div className="row border p-3">
                <div className="col-md-3">
                    <img
                        alt={`${product.title} thumbnail`}
                        src={product.thumbnail}
                        style={{
                            width: "100%",
                            height: "300px",
                            borderTopLeftRadius: "10px",
                            borderTopRightRadius: "10px",
                        }}
                    />
                </div>
                <div className="col-md-3 d-flex align-items-center justify-content-center">
                    <div>
                        <p className="h-100 text-success fs-5 fw-bold">
                            {product.title}
                        </p>
                        <p className="h-100 text-success fs-5 fw-bold">
                            Category: {product.category}
                        </p>
                    </div>
                </div>
                <div className="col-md-3 d-flex align-items-center justify-content-between">
                    <div>
                        <button onClick={increase} className="bg-success py-1 px-3 border-0 text-light fs-4">+</button>
                        <span className="py-1 px-3 fs-4">{quantity}</span>
                        <button onClick={decrease} className="py-1 px-3 border-0 border-success text-success fs-4">-</button>
                    </div>
                </div>
                <div className="col-md-3 d-flex align-items-center justify-content-center">
                    <div>
                        {cartList.indexOf(product.id) === -1 && (
                            <Button
                                variant={product.stock > 0 ? 'outline-success' : 'outline-secondary'}
                                disabled={product.stock === 0}
                                onClick={handleButtonClick}
                                className="mt-auto"
                                style={{ fontSize: '0.8rem', borderRadius: '15px' }}
                            >
                                Add To Cart
                            </Button>
                        )}
                        {cartList.indexOf(product.id) !== -1 && (
                            <Button
                                variant='outline-secondary'
                                onClick={handleButtonClick}
                                className="mt-auto bg-success text-light fs-5"
                                style={{ fontSize: '0.8rem', borderRadius: '15px' }}
                            >
                                Remove From Cart
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartCard;