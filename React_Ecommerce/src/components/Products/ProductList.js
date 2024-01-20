import { useEffect, useState } from "react";

import ProductCard from "./ProductCard";
import { axiosInstance } from "../../apis/config";

const ProductList = () => {
    const [product, setProducts] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("")
      .then((res) => setProducts(res.data.products))
      .catch((err) => console.log(err));
  }, []);
  ////////////////////////////////////
    return (
        <>
            <h1>Product List</h1>
            <hr />
            <div className="container">
            <div className="row g-4">
            {product.map((product) => {
                    return (
                        <div className="col-lg-3 col-md-6 col-12 d-flex  justify-content-center align-items-center" key={product.id}>
                            <ProductCard productItem={product}/>
                        </div>
                    );
                })}
            </div>
            </div>
           
        </>
    )
}
export default ProductList;

