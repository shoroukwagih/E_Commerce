import { useState } from "react";
import { productList } from "./data";
import ProductCard from "./ProductCard";

const ProductList = () => {
    const [products,setProducts]=useState(productList)
    return (
        <>
            <h1>Product List</h1>
            <hr />
            <div className="row row-cols-1 row-cols-md-3 g-4">
            {products.map((product) => {
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