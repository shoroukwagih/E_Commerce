// import ProductList from './components/Products/ProductList';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router/Routers';
// import Header from './LayOut/Header';
function App() {
  return (
    <>
    <BrowserRouter>
         <Router />
    </BrowserRouter>
    {/* <Header />
      <div className='container my-5'>
        
         <ProductList />
      </div> */}
    </>
  );
}

export default App;
