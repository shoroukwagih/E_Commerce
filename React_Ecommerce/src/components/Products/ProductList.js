import { useEffect, useState } from "react";

import ProductCard from "./ProductCard";
import { axiosInstance } from "../../apis/config";

const ProductList = () => {
    const [product, setPoducts] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("" , {
        params : {
            title : 'super'
        }
      })
      .then((res) => setPoducts(res.data.products))
      .catch((err) => console.log(err));
  }, []);
  ////////////////////////////////////
    return (
        <>
            <h1>Product List</h1>
            <hr />
            <div className="row row-cols-1 row-cols-md-4 g-4">
            {product.map((product) => {
                    return (
                        <div className="col" key={product.id}>
                            <ProductCard productItem={product}/>
                        </div>
                    );
                })}
            </div>
        </>
    )
}
export default ProductList;