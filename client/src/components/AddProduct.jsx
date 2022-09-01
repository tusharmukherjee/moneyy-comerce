import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 } from 'uuid'

const AddProduct = () => {

    const navigate = useNavigate();

    const [addtoggle, setAddToggle] = useState(false);

    const [productDet, setproductDet] = useState({
        user_id: "u-123",
        productId: "",
        name: "",
        price: 0,
        imagelink: "",
        product_description: ""
    });

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setproductDet({
            ...productDet,
            [name]: value,
        });
        console.log(productDet);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setAddToggle(!addtoggle);

        setproductDet({
            user_id: "u-123",
            productId: v4(),
            name: productDet.name.trim(),
            price: productDet.price.trim(),
            imagelink: productDet.imagelink.trim(),
            product_description: productDet.product_description.trim()
        })

        // console.log(productDet);


    }

    useEffect(() => {

        if (addtoggle) {
            fetch("http://localhost:3001/api/products/addproduct/", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productDet)
            })
                .then(res => res.json())
                .then(() => navigate("/"));
        }

    }, [addtoggle, productDet, navigate])


    return (
        <div className=' h-screen flex justify-center items-center'>
            <form className=' p-4 border-[1px] rounded-xl' onSubmit={handleSubmit}>
                <div className=' grid gap-4 mb-4'>
                    <input className=' border-[1px] rounded-md py-1 px-2' type="text" placeholder='Product Name' name='name' value={productDet.name} onChange={handleChange} required />
                    <input className=' border-[1px] rounded-md py-1 px-2' type="text" placeholder='Price' name='price' value={productDet.price} onChange={handleChange} required />
                    <input className=' border-[1px] rounded-md py-1 px-2' type="text" placeholder='Image Link' name='imagelink' value={productDet.imagelink} onChange={handleChange} />
                    <textarea className=' border-[1px] rounded-md py-  1 px-2' id="" placeholder='Description' name='product_description' value={productDet.product_description} onChange={handleChange} cols="50" rows="10" required></textarea>
                </div>
                <div className=' w-full flex justify-end'>
                    <button type='submit' className='w-fit py-1 px-2 bg-sky-500 text-white rounded-md'>Add</button>
                </div>
            </form>

        </div>
    )
}

export default AddProduct