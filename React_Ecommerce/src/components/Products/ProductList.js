import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { axiosInstance } from "../../apis/config";
import Paginations from "./Pagination";


import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';


const ProductList = () => {
  const [product, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  const [categories,setCategories]= useState([])

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

  ///////////////////Abdelrahman Ahmed/////////////////
  useEffect(() => {
    axiosInstance.get('/categories')
    .then((response)=>{
        setCategories(response.data);
    })
    .catch((error)=>{
        console.log(error)
    });
}, [])



  const listProducts = (categoryName) =>{
    axiosInstance.get('/category/'+ categoryName)
    .then((response)=>{
        setProducts(response.data.products);
    })
    .catch((error)=>{
        console.log(error)
    });
  }

  const listallproducts=() =>{
    
    axiosInstance.get("")
    .then((response)=>{
        setProducts(response.data.products);
    })
    .catch((error)=>{
        console.log(error)
    });
}
  
  
  const search = (findher) => {
    
    axiosInstance.get('/search?q='+findher )
    .then((response)=>{
        
        setProducts(response.data.products);
    })
    .catch((error)=>{
        console.log(error)
    });
} 

/////////////////////////////////////////////////////

  return (
    <>
      <h1>Product List</h1>
      <hr />

      {/*////////////////////////Abdelrahman Ahmed//////////////////////////////////////*/ }
      <InputGroup className="mb-3" style={{alignItems:"center"}}>
                <InputGroup.Text style={{position:"relative" ,left:"10px"}} id="basic-addon1" >Search Bar</InputGroup.Text>
                <Form.Control
                style={{marginRight:"20px", position:"relative" ,left:"10px"}}
                    placeholder="Write her to search for what you need"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={(e)=>search(e.target.value)} 
                />
            </InputGroup> 

            {categories.map(category=>
               <Button style={{margin: "10px" }} variant="primary" onClick={()=>listProducts(category)}>{category}</Button>
               )
            }

            <Button variant="success" onClick={()=>listallproducts()}>All product</Button>


            {/*//////////////////////////////////////////////////////////////////*/ }

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
