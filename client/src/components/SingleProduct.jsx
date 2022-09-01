import React, { useContext } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom'
import { Head } from '../Context';

const SingleProduct = ({ allProducts }) => {

    const { cart, setcart } = useContext(Head);
    const [iscart, setiscrt] = useState();

    const addToCart = () => {
        setcart(prevState => ([
            ...prevState,
            allProducts
        ]))
    }

    const removeCart = async () => {
        const removed = await cart.filter((el) => {
            return el.productId !== allProducts.productId;
        });
        setiscrt(false);
        if (!Boolean(removed.length)) {
            setcart([]);
        }
        else {
            setcart(
                removed
            );
        }
    }

    useEffect(() => {

        cart.filter((el) => {
            if (el.productId === allProducts.productId) {
                setiscrt(true)
            }
            return 1;
        })

    }, [cart, allProducts.productId])

    return (

        <div className="p-4 w-fit h-fit  mr-8 mb-8 border-[1px] hover:shadow-md rounded-xl">
            <div className="block relative h-48 rounded overflow-hidden">
                <img className="object-cover object-center w-full h-full block" src={allProducts?.imagelink} alt={allProducts?.name} />
            </div>
            <div className="mt-4">
                <h2 className="text-gray-900 title-font text-lg font-medium">{allProducts?.name}</h2>
                <p className="mt-1">₹{allProducts?.price}</p>
            </div>
            <div className="mt-4 flex justify-between items-center">
                {
                    (!iscart)
                        ?
                        <button onClick={() => addToCart()} className=' w-fit py-1 px-2 border-[1px] border-black rounded-md'>
                            To Cart
                        </button>
                        :
                        <button onClick={() => removeCart()} className=' w-fit py-1 px-2 border-[1px] border-black rounded-md'>
                            Remove
                        </button>
                }

                <Link to={`/${allProducts.productId}`}>
                    <button className=' w-fit py-1 px-2 bg-black text-white rounded-md'>
                        Detail
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default SingleProduct