import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { axiosInstance } from "../../apis/config";
import Paginations from "./Pagination";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axiosInstance
      .get("")
      .then((res) => setProducts(res.data.products))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axiosInstance.get('/categories')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const listProducts = (categoryName) => {
    axiosInstance.get('/category/' + categoryName)
      .then((response) => {
        setProducts(response.data.products);
        setSelectedCategory(categoryName);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const listAllProducts = () => {
    axiosInstance.get("")
      .then((response) => {
        setProducts(response.data.products);
        setSelectedCategory(null);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleSearch = () => {
    axiosInstance.get('/search?q=' + searchTerm)
      .then((response) => {
        setProducts(response.data.products);
        setSelectedCategory(null);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Product List</h1>
      <hr />

      <div className="container">
        <InputGroup className="mb-3">
          <Form.Control
            style={{ borderRadius: "10px" }}
            placeholder="Search for products..."
            aria-label="Search"
            aria-describedby="basic-addon1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="success" onClick={handleSearch}>Search</Button>
        </InputGroup>
      </div>

      <div className="container mt-3 mb-3">
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-categories">
            {selectedCategory ? selectedCategory : "Select Category"}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {categories.map((category) => (
              <Dropdown.Item key={category} onClick={() => listProducts(category)}>
                {category}
              </Dropdown.Item>
            ))}
            <Dropdown.Divider />
            <Dropdown.Item onClick={listAllProducts}>All Products</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <div className="container">
        <div className="row g-4">
          {currentProducts.map((product) => (
            <div className="col-lg-4 col-md-6 col-12 mb-3" key={product.id}>
              <ProductCard productItem={product} />
            </div>
          ))}
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-center mt-3">
        <Paginations paginationFun={(page) => paginate(page)} />
      </div>
    </>
  );
};

export default ProductList;
