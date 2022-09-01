import React from 'react';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Allproducts from './components/Allproducts';
import Detailedproduct from './components/Detailedproduct';
import AddProduct from './components/AddProduct';
import Home from './components/Home';
import EditProduct from './components/EditProduct';
import Cart from './components/Cart';
function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path='/' element={<Home />}>
                        <Route path='' element={<><Allproducts /></>} />
                        <Route path=':productId' element={<Detailedproduct />} />
                        <Route path='addproduct' element={<AddProduct />} />
                        <Route path='edit/:productId' element={<EditProduct />} />
                        <Route path='/cart' element={<Cart />} />
                    </Route>
                </Routes>
            </Router>
        </>
    );
}

export default App;