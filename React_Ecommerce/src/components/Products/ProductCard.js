// ProductCard.js
import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { decreaseCounter, increaseCounter } from "../../store/slices/counter";
import { useSelector, useDispatch } from "react-redux";

const ProductCard = ({ productItem }) => {
  const { id, title, thumbnail, description, price, stock, rating } = productItem;
  const cartList = useSelector((state) => state.counter.cartList);
  const dispatch = useDispatch();

  const renderStockStatus = () => {
    return (
      <p className={`text-${stock > 0 ? 'success' : 'danger'}`} style={{ fontWeight: 'bold' }}>
        {stock > 0 ? 'In Stock' : 'Out of Stock'}
      </p>
    );
  };

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

  const handleButtonClick = () => {
    if (cartList.indexOf(id) === -1) {
      dispatch(increaseCounter(id));
    } else {
      dispatch(decreaseCounter(id));
    }
  };

  return (
    <Card style={{ width: '18rem', height: '100%' }} className="d-flex flex-column">
      <div style={{ position: 'relative', overflow: 'hidden', height: '200px' }}>
        <Card.Img style={{ objectFit: 'cover', width: '100%', height: '100%' }} variant="top" src={thumbnail} alt={title} />
      </div>
      <Card.Body className="d-flex flex-column">
        {renderStockStatus()}
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Text>${price}</Card.Text>
        <div className="rating">{renderRatingStars()}</div>
        <Button
          variant={stock > 0 ? 'outline-success' : 'outline-secondary'}
          disabled={stock === 0}
          onClick={handleButtonClick}
          className="mt-auto"
          style={{ fontSize: '0.8rem', borderRadius: '15px' }}
        >
          {cartList.indexOf(id) === -1 ? "Add To Cart" : "Remove From Cart"}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;

