import React, { createContext, useState, useEffect } from 'react';
import data from '../data';

export const CartContext = createContext();

const CartContextProvider = (props) => {

    useEffect(() => {
        const localCart = localStorage.getItem("myCart");
        setCart(JSON.parse(localCart));

        const localExact = localStorage.getItem("myExact");
        setExact(JSON.parse(localExact));
    }, [])


    const [cart, setCart] = useState([]);
    const [exact, setExact] = useState(data);

    const addToCart = (id) => {
        var newCart = [...cart];
        exact.forEach((product) => {
            if (product.id === id && product.incart === false ) {
                newCart = [...cart, product];
                // Adding a count property
                product.count = 1;
            }
        })
        localStorage.setItem("myCart", JSON.stringify(newCart));
        setCart(newCart);
    }

    const handleRemove = (id) => {
        const newCart = cart.filter((product) => product.id !== id );
        setCart(newCart);
        localStorage.setItem("myCart", JSON.stringify(newCart));
    }

    const handleExact = (id) => {
        setExact((exact) => {
            var newExact = [...exact];
            newExact.forEach((product) => {
                if ( product.id === id ) {
                    product.incart = true;
                }
            })
            localStorage.setItem("myExact", JSON.stringify(newExact));
            return newExact;
        })
    }

    const removeExact = (id) => {
        setExact((exact) => {
            var newExact = [...exact];
            newExact.forEach((product) => {
                if ( product.id === id ) {
                    product.incart = false;
                }
            })
            localStorage.setItem("myExact", JSON.stringify(newExact));
            return newExact;
        })
    }

    const clearCart = () => {
        setExact((exact) => {
            var newExact = [...exact];
            newExact.forEach((product) => {
                if ( product.incart === true ) {
                    product.incart = false;
                }
            })
            localStorage.setItem("myExact", JSON.stringify(newExact));
            return newExact;
        })
        setCart([]);
        localStorage.setItem("myCart", JSON.stringify([]));
    }

    const handleCount = ( index, number, cost ) => {
        var newCart = [...cart];
        newCart[index].count = number;
        newCart[index].price = cost;
        setCart(newCart);
        localStorage.setItem("myCart", JSON.stringify(newCart));
    }


    return (
        <CartContext.Provider value={{ 
            cart,
            addToCart,
            exact,
            handleRemove,
            handleExact,
            removeExact,
            clearCart,
            handleCount
         }}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartContextProvider;