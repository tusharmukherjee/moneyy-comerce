import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className=' bg-black text-white px-12 py-3 sticky top-0 left-0 right-0 z-50'>
            <div className=' flex items-center justify-between'>
                <div>
                    <h2>
                        <Link to={'/'}>SHOP</Link>
                    </h2>
                </div>
                <div className=' flex items-center'>
                    <Link to={'/addproduct'} className=' mr-8'>
                        Add Product
                    </Link>
                    <Link to={'/cart'}>
                        <button className=' flex items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-2">
                                <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                            </svg>
                            <span>
                                Cart
                            </span>
                        </button>
                    </Link>

                </div>
            </div>
        </nav>
    )
}

export default Navbar