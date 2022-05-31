import React, { createContext, useState, useEffect } from 'react';
import data from '../data';

export const ProductContext = createContext();

const ProductContextProvider = (props) => {

    useEffect(() => {
        const localProducts = localStorage.getItem("myProducts");
        setProducts(JSON.parse(localProducts));
    }, [])

    const [ products, setProducts ] = useState(data);
    const [active, setActive ] = useState(0);
    const [toggle, setToggle] = useState(false);
    const [select, setSelect] = useState({
        shoes: [],
        option: ""
    })
    const [pick, setPick] = useState(4);

    const handleToggle = () => {
        setToggle(!toggle);
    }

    const handleCategory = (category) => {
        if ( category === "categories") {
            setProducts(data);
            return;
        }
        const newProducts = data.filter((product) => 
        product.category === category);
        setProducts(newProducts);
        setSelect({
            shoes: newProducts,
            option: category
        })
        setActive("");
    }

    const handleActive = (brand, index) => {
        setActive(index);
        const { shoes, option } = select;
        if ( brand === "All" && ( option === "" || 
        option === "categories")) {
            setProducts(data);
            return;
        } else if ( option === "" || option === "categories") {
            const newProducts = data.filter((product) => 
            product.name === brand );
            setProducts(newProducts);
            return;
        } else if ( option !== "categories" && brand === "All") {
            setProducts(shoes);
            return;
        } else {
            const newProducts = shoes.filter((product) => 
            product.name === brand);
            setProducts(newProducts);
            return;
        }
    }

    const handlePick = (index) => {
        setPick(index);
    }

    const handleCart = (index) => {
        const newProducts = [...products];
        newProducts[index].incart = true;
        localStorage.setItem("myProducts", JSON.stringify(newProducts));
        setProducts(newProducts);
    }

    const singleCart = (id) => {
        const newProducts = [...products];
        newProducts.forEach((product) => {
            if ( product.id === id ) {
                product.incart = true;
            }
        })
        setProducts(newProducts);
        localStorage.setItem("myProducts", JSON.stringify(newProducts));
    }

    const removeCart = (id) => {
        const newProducts = [...products];
        newProducts.forEach((product) => {
            if ( product.id === id ) {
                product.incart = false
            }
        })
        setProducts(newProducts);
        localStorage.setItem("myProducts", JSON.stringify(newProducts));
    }

    const handleClear = () => {
        setProducts((products) => {
            var newProducts = [...products];
            newProducts.forEach((product) => {
                if ( product.incart === true ) {
                    product.incart = false;
                }
            })
            localStorage.setItem("myProducts", JSON.stringify(newProducts));
            return newProducts;
        })
    }


    return (
        <ProductContext.Provider value={{ 
            products,
            active,
            handleActive,
            toggle,
            handleToggle,
            handleCategory,
            pick,
            handlePick,
            handleCart,
            singleCart,
            removeCart,
            handleClear
             }}>
            {props.children}
        </ProductContext.Provider>
    )
}

export default ProductContextProvider;