import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { axiosInstance } from "../../apis/config";
import Paginations from "./Pagination";

const ProductList = () => {
  const [product, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  useEffect(() => {
    axiosInstance
      .get("")
      .then((res) => setProducts(res.data.products))
      .catch((err) => console.log(err));
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = product.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <h1>Product List</h1>
      <hr />
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
