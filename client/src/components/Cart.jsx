import React from 'react'
import { useContext } from 'react'
import { Head } from '../Context'
import Cartproduct from './Cartproduct';

const Cart = () => {
    const { cart } = useContext(Head);
    return (
        <div className=' min-h-screen font-thin px-12 py-8 flex flex-wrap'>
            {
                cart?.map((el) => {
                    return (
                        <Cartproduct allProducts={el} key={el.productId} />
                    )
                })
            }

        </div>
    )
}

export default Cart