import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const ProductCard = ({ productItem }) => {
  const { title, thumbnail, description, price, stock, rating } = productItem;

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
          onClick={() => console.log(`Add to Cart: ${title}`)}
          className="mt-auto"
          style={{ fontSize: '0.8rem', borderRadius: '15px' }}
        >
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
