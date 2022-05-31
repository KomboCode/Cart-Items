import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHome, AiOutlineShoppingCart } from 'react-icons/ai';
import { ProductContext } from '../contexts/productContext';

const Navbar = () => {

    const { toggle } = useContext(ProductContext);

    return (
        <section className='navbar'>
            <div>
                <img src='./icons/thelogo.png' width='100px'/>
                <h1 
                  style={ toggle ? { display: "none"}: null }
                >Gorota</h1>
            </div>
            <ul>
                <li><Link to="/"><AiOutlineHome className='icon'/>
                <span>Home</span></Link></li>

                <li><Link to="/cart"><AiOutlineShoppingCart className='icon'/>
                <span>Cart</span></Link></li>
            </ul>
        </section>
    )
}

export default Navbar;