import React, { useContext, useState } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } 
from 'react-icons/md';
import { HiArrowNarrowLeft, HiArrowNarrowRight } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { ProductContext } from '../contexts/productContext';
import Size from './singleItem/size';
import { CartContext } from '../contexts/cartContext';

const SingleItem = () => {

    const { products, pick, singleCart } = useContext(ProductContext);
    const { exact, addToCart } = useContext(CartContext);

    const [ item, setItem ] = useState(pick);
    const [ shoe, setShoe ] = useState(exact);
    const [ check, setCheck ] = useState(false);

    var active = [];
    if ( check === false ) {
        active = products[item];
    } else {
        active = shoe[0];
    }

    const { id, name, price, image, category, size, incart 
    } = active;

    const handleIncrement = () => {
        setCheck(false);
        setItem((item) => {
            item += 1;
            if ( item === products.length) {
                item = 0;
            }
            return item;
        })
    }

    
    const handleDecrement = () => {
        setCheck(false);
        setItem((item) => {
            item -= 1;
            if ( item === -1 ) {
                item = products.length - 1;
            }
            return item;
        })
    }

    const handleSize = (value) => {
        setCheck(true);
        const newShoe = exact.filter((product) => product.size == value);
        setShoe(newShoe);
    }
    
    const handleCart = (id) => {
        addToCart(id);
        singleCart(id);
    }

    return (
        <section className='single-item'>
            <Size handleSize={handleSize}/>
            <div className='item'>
                <img src={image}/>
                <div className='info'>
                    <div className='word-info'>
                        <div className='line'></div>
                        <h3>{size}<span>Size</span></h3>
                        <h1>{name} Shoe</h1>
                        <h2>${price}</h2>
                        <div><span
                           onClick={handleDecrement}
                        ><MdKeyboardArrowLeft className='arrow'/>
                        </span><span
                           onClick={handleIncrement}
                        ><MdKeyboardArrowRight className="arrow"/>
                        </span></div>
                        <h4>Category : {category}</h4>
                    </div>
                    <button
                      onClick={() => handleCart(id)}
                    >
                        { incart ? "In Cart" : "Add To Cart"}
                        <AiOutlineShoppingCart className='cart'/>
                    </button>
                </div>
            </div>
            <div className='arrow-link'>
                <div>
                    <Link to="/">
                        <HiArrowNarrowLeft className='narrow'/>
                    </Link>
                </div>
                <div>
                    <Link to="/cart">
                        <HiArrowNarrowRight className="narrow"/>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default SingleItem;