import React, { useEffect } from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { v4 } from 'uuid';

const Addreview = ({ reviews, setAddToggle, addtoggle }) => {

    const { productId } = useParams();

    const [addmnt, setaddcmnt] = useState(false);

    const [reviewop, setreviewop] = useState({
        review_id: "",
        product_id: productId,
        user_id: "u-123",
        description: ""
    });

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setreviewop({
            ...reviewop,
            [name]: value,
        });
        console.log(reviewop);
    };

    const handleSubmit = async (e) => {
        setreviewop({
            ...reviewop,
            review_id: v4(),
            description: reviewop.description.trim()
        });

        setAddToggle(!addtoggle);
        setaddcmnt(!addmnt);

    }

    useEffect(() => {

        if (addtoggle && addmnt) {
            fetch("http://localhost:3001/api/products/addreview/", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reviewop)
            })
                .then(res => res.json())
                .then(() => setAddToggle(!addtoggle))
                .then(() => setaddcmnt(!addmnt))
                .then(() => setreviewop({
                    review_id: "",
                    product_id: productId,
                    user_id: "u-123",
                    description: ""
                }))
        }

    }, [addtoggle, addmnt, productId, reviewop, setAddToggle])

    const handleDelete = async (review_id) => {
        const object = {
            review_id: review_id
        }
        await fetch("http://localhost:3001/api/products/deletereview/", {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(object)
        }).then(res => res.json())
            .then(() => setAddToggle(!addtoggle))
            .then(data => console.log(data))
    }

    // console.log(reviews);
    return (
        <div className=' w-full mt-12 px-12 flex justify-between'>
            <div className=' '>
                <div className=' flex flex-col p-8 justify-center items-center'>
                    <textarea value={reviewop.description} onChange={handleChange} name="description" id="" cols="50" rows="10" className=' rounded-md p-4 border-[1px]' placeholder=' Add Review'></textarea>
                    <div className=' flex justify-end mt-4 w-full'>
                        <button onClick={() => handleSubmit()} className='w-fit py-1 px-2 bg-sky-500 text-white rounded-md'>Add</button>
                    </div>
                </div>

            </div>
            <div className=' px-8 py-8 max-w-xl'>
                {
                    reviews?.map((el) => {
                        return (
                            <div className=' p-4 mb-4 border-[1px] rounded-md min-w-[26rem]' key={el.review_id}>
                                <div className=' mb-4'>
                                    <div className=' flex justify-between items-center'>
                                        <h3>{el.username}</h3>
                                        <span onClick={() => handleDelete(el.review_id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-red-500">
                                                <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    {el.description}
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}

export default Addreview