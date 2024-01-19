import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { increaseCounter } from "../store/slices/counter";
import { axiosInstance } from "../apis/config";
import "./ProductDetails.css";


const ProductDetails = () => {
          
     const { id , rating } = useParams();
     const [product, setProduct] = useState({
     });
     const dispatch = useDispatch();
     const cartList = useSelector((state) => state.counter.cartList);
     const renderRatingStars = () => {
          const fullStars = Math.floor(rating);
          const halfStar = rating % 1 !== 0;
          const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

          const stars = [];

          for (let i = 0; i < fullStars; i++) {
               stars.push(<i key={i} className="bi bi-star-fill text-warning"></i>);
          }

          if (halfStar) {
               stars.push(<i key="half" className="bi bi-star-half text-warning"></i>);
          }

          for (let i = 0; i < emptyStars; i++) {
               stars.push(<i key={i + fullStars + 1} className="bi bi-star text-warning"></i>);
          }

          return stars;
     };


     useEffect(() => {
          axiosInstance
               .get(`/${id}`)
               .then((res) => setProduct(res.data))
               .catch((err) => console.log(err));
     }, []);
  

     
     const handleAddToCart = () => {
          if (product && product.id && cartList.indexOf(product.id) === -1) {
               dispatch(increaseCounter(product.id));
          }
     };
     

     return (
          <div className="container my-2">
               <Card>
                    <Row>
                         <Col xs={12} md={6}>
                              {product.thumbnail && (
                                   <Card.Img variant="top" src={product.thumbnail} alt={product.title} className="main-thumbnail" />
                              )}
                              <Row className="additional-thumbnails">
                                   {/* Render four additional thumbnails here */}
                              </Row>
                         </Col>
                         <Col xs={12} md={6}>
                              <Card.Body>
                                   {product.title ? (
                                        <Card.Title className="product-title">{product.title}</Card.Title>
                                   ) : (
                                        <Card.Title>Loading...</Card.Title>
                                   )}
                                   {product.description && <Card.Text className="product-description">{product.description}</Card.Text>}
                                   <div className="rating">{renderRatingStars()}</div>
                                   {product.price && <Card.Text>Price: ${product.price}</Card.Text>}
                                   {product.error ? (
                                        <Card.Text>Error: {product.error}</Card.Text>
                                   ) : (
                                        <Button
                                             className={`btn-${cartList.indexOf(product.id) === -1 ? 'success' : 'secondary'}`}
                                             onClick={handleAddToCart}
                                        >
                                             {cartList.indexOf(product.id) === -1 ? 'Add to Cart' : 'In Cart'}
                                        </Button>
                                   )}
                              </Card.Body>
                         </Col>
                    </Row>
               </Card>
          </div>
     );
};
     
export default ProductDetails;
