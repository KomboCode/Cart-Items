import React, { useState } from 'react';

const Size = ({ handleSize }) => {

    const [ range, setRange ] = useState(0);

    const handleChange = (value) => {
        setRange(value); 
        handleSize(value);
    }

    return (
        <form className='size'>
            <label>Size<span>{range}</span></label>
            <input
                id="range"
                type="range"
                min="1"
                max="15"
                onChange={(e) => handleChange(e.target.value)}
            />
        </form>
    )
}

export default Size;