import React, { useContext } from 'react';
import { CartContext } from '../contexts/cartContext';
import { ProductContext } from '../contexts/productContext';
import Item from './cart/item';
import data from '../data';

const Cart = () => {

    const { 
        cart, 
        handleRemove, 
        removeExact,
        clearCart,
        handleCount
    } = useContext(CartContext);
    const { removeCart, handleClear } = useContext(ProductContext);

    var sum = 0;

    cart.forEach((product) => {
        sum = sum + product.price;
    })

    const handleChange = (id) => {
        handleRemove(id);
        removeCart(id);
        removeExact(id);
    }

    const clearAll = () => {
        clearCart();
        handleClear();
    }

    return (
        <section className='cart'>
            { cart.length > 0 ?
            <div className='total'>
                <h2>Total Cost: <span>${sum}</span></h2>
                <button
                  onClick={clearAll}
                >Clear Cart</button>
            </div> :
            <div className='empty'>
                <h2>Empty Cart</h2>
            </div>}

            { cart.length > 0 ?
            <div className='titles'>
                <h2>BRAND</h2>
                <h2>PRICE</h2>
                <h2>AMOUNT</h2>
                <h2>DELETE</h2>
                <h2>TOTAL PRICE</h2>
            </div> : null }

            { cart.map((product, index) => {
                return (
                    <Item
                        key={product.id}
                        product={product}
                        index={index}
                        handleChange={handleChange}
                        handleCount={handleCount}
                        data={data}
                    />
                )
            })}

        </section>
    )
}

export default Cart;