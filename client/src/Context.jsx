import React, { createContext, useState } from 'react'

export const Head = createContext();

const Context = ({ children }) => {
    const [cart, setcart] = useState([]);

    return (
        <Head.Provider value={{ cart, setcart }}>{children}</Head.Provider>
    )
}

export default Context