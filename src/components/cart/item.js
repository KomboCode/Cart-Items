import React, { useState, useEffect } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';

const Item = ({
    product,
    index,
    handleChange,
    handleCount,
    data
}) => {

    console.log(product);

    const { id, name, image, price, count } = product;

    const [ number, setNumber ] = useState(count);
    const [unChanged, setUnchanged ] = useState(price);
    const [ cost, setCost ] = useState(price);

    useEffect(() => {
        data.forEach((item) => {
            if ( item.id === id ) {
                setUnchanged(item.price);
            }
        })
    }, [])

    const handleIncrement = () => {
        setNumber((number) => {
            number += 1;
            setCost((cost) => {
                cost = unChanged * number;
                handleCount( index, number, cost );
                return cost;
            })
            return number;
        })
    }


    
    const handleDecrement = () => {
        setNumber((number) => {
            number -= 1;
            if ( number < 0 ) {
                number = 0;
            }
            setCost((cost) => {
                cost = unChanged * number;
                handleCount( index, number, cost );
                return cost;
            })
            return number;
        })
    }

    return (
        <div className='cart-item'>
            <div className='image-bg'>
                <img src={image} width="190px"/>
            </div>
            <div className='wrapper'>
                <h3>{name}</h3>
                <h3>${unChanged}</h3>
                <div className='count'>
                    <span onClick={handleDecrement}>-</span>
                    <span>{number}</span>
                    <span onClick={handleIncrement}>+</span>
                </div>
                <div>
                    <RiDeleteBin6Line 
                    className='delete'
                    onClick={() => handleChange(id)} 
                    />
                    <h4>${cost}</h4>
                </div>
            </div>
        </div>
    )
}

export default Item;