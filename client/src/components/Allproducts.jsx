import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import SingleProduct from './SingleProduct'

const Allproducts = () => {

    const [allProducts, SetAllProducts] = useState();


    useEffect(() => {
        fetch("http://localhost:3001/api/products/getallproducts/")
            .then(res => res.json())
            .then(data => SetAllProducts(data));

    }, []);


    return (
        <div className=' min-h-screen font-thin px-12 py-8 flex flex-wrap'>
            {
                allProducts?.map((el) => {
                    return (
                        <SingleProduct allProducts={el} key={el.productId} />
                    )
                })
            }

        </div>
    )
}

export default Allproducts