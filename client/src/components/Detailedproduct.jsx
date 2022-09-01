import React from 'react'
import { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Head } from '../Context';
import Addreview from './Addreview';

const Detailedproduct = () => {
    const { productId } = useParams();
    const navigate = useNavigate();

    const [addtoggle, setAddToggle] = useState(false);

    const { cart, setcart } = useContext(Head);
    const [iscart, setiscrt] = useState();

    const [detail, setDetail] = useState();

    useEffect(() => {

        const object = {
            productId: productId
        }

        fetch("http://localhost:3001/api/products/getsingleproduct/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(object)
        })
            .then(res => res.json())
            .then(data => setDetail(data));
    }, [addtoggle, productId]);


    const handleDelete = async () => {
        const object = {
            productId: productId
        }
        await fetch("http://localhost:3001/api/products/deleteproduct/", {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(object)
        }).then(res => res.json())
            .then(() => navigate("/"))
    }

    const cartObj = {
        name: detail?.product?.[0].name,
        price: detail?.product?.[0]?.price,
        productId: detail?.product[0]?.productId,
        imagelink: detail?.product[0]?.imagelink
    }



    const addToCart = () => {
        setcart(prevState => ([
            ...prevState,
            cartObj
        ]))
    }

    const removeCart = async () => {
        const removed = await cart.filter((el) => {
            return el.productId !== detail?.product[0]?.productId;
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
            // console.log(detail?.product[0].productId);
            if (el.productId === detail?.product[0]?.productId) {
                setiscrt(true);
                // console.log(true)
            }
            return 1;
        })

    }, [detail, cart])



    return (
        <>
            <section className="text-gray-600 body-font overflow-hidden">
                <div className="container px-5 py-24 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <img alt={detail?.[0]?.name} className=" lg:w-4/12 w-full lg:h-auto h-64 object-contain rounded" src={detail?.product?.[0]?.imagelink} />
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest">Product</h2>
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{detail?.product?.[0]?.name}</h1>

                            <p className="leading-relaxed mt-4">{detail?.product?.[0]?.product_description}</p>

                            <div className="flex mt-8 justify-between">
                                <span className="title-font font-medium text-2xl text-gray-900">₹{detail?.product?.[0]?.price}</span>
                                <div className=' flex'>
                                    <Link to={`/edit/${productId}`}>
                                        <button className="flex ml-auto border-[1px] border-indigo-500 text-indigo-500 py-2 px-6 focus:outline-none rounded mr-4 cursor-pointer">Edit</button>
                                    </Link>
                                    {
                                        (!iscart)
                                            ?
                                            <button onClick={() => addToCart()} className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded mr-4 cursor-pointer">To Cart</button>
                                            :
                                            <button onClick={() => removeCart()} className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded mr-4 cursor-pointer">Remove</button>
                                    }
                                    <button onClick={() => handleDelete()} className=' rounded-full mr-4 bg-red-500 text-white p-3' title='Delete Product'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                            <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <hr />
            <Addreview reviews={detail?.reviews} setAddToggle={setAddToggle} addtoggle={addtoggle} />
        </>
    )
}

export default Detailedproduct