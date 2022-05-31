import React from 'react';
import { Link } from "react-router-dom";
import { TiTickOutline } from 'react-icons/ti';
import { AiOutlineShoppingCart } from 'react-icons/ai';

const Product = ({ 
    id,
    incart,
    name, 
    price,
    image,
    index,
    handlePick,
    toggle,
    handleChange
}) => {
    return (
        <div className='card'>
            <h2>{name}</h2>
            <h3>${price}</h3>
            <img src={image}/>
            <Link 
                to="/singleItem"
                onClick={() => handlePick(index)}
            >Buy Now</Link>
            <div
              style={ toggle ? {
                  left: "0px",
                  top: "12px"
              } : null }
              onClick={() => handleChange(id, index)}
            >
                { incart ? <TiTickOutline className='icon'/>
                         : <AiOutlineShoppingCart className='icon'/>}
            </div>
        </div>
    )
}

export default Product;