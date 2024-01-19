import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Button, CardImg, CardBody } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { increaseCounter } from "../store/slices/counter";
import { axiosInstance } from "../apis/config";


const ProductDetails = () => {
          
     const { id } = useParams();
     const [product, setProduct] = useState({});
     const dispatch = useDispatch();
     const cartList = useSelector((state) => state.counter.cartList);

     useEffect(() => {
          const fetchProductDetails = async () => {
               try {
                    const response = await axiosInstance.get(`/${id}`);
                    setProduct(response.data.product);
               } catch (error) {
                    console.error(" Error to find product details: ", error);
               }
          };
          fetchProductDetails();
     }, [id]);

     const handleAddToCart = () => {
          if (cartList.indexOf(product.id) === -1) {
               dispatch(increaseCounter(product.id));
          }
     };
     
     return (
          <div className="container my-4">
               <Card>
                    <Card.Img variant="top" src={product.thumbnail} alt={product.title} />
                    <Card.Body>
                         <Card.Title>{product.title}</Card.Title>
                         <Card.Text>{product.description}</Card.Text>
                         <Card.Text>Price: ${product.price}</Card.Text>
                         <Button
                              variant={cartList.indexOf(product.id) === -1 ? 'success' : 'secondary'}
                              onClick={handleAddToCart}
                         >
                              {cartList.indexOf(product.id) === -1 ? 'Add to Cart' : 'In Cart'}
                         </Button>
                    </Card.Body>
               </Card>
          </div>
     );
};
     
export default ProductDetails;
