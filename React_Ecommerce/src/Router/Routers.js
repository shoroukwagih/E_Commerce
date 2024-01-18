import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from '../LayOut/Layout'
import ProductList from '../components/Products/ProductList';
import Cart from '../pages/Cart';
import NotFound from '../pages/NotFound';


export default function Router() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path='' element={<ProductList />} />
                {/* <Route path='/product-details/:id' element={<GameDetails />} /> */}
                <Route path='/cart' element={<Cart />} />
                <Route path='*' element={<NotFound />} />
            </Route>
      
        </Routes>
    )
}
