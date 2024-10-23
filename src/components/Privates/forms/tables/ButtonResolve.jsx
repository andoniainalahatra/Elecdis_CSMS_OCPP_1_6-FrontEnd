import React from 'react';

const ButtonResolve=(props)=> {
    const {Id,value} =props;
    return (
        <button type="submit" className="bg-primaryChart">{value}</button>
    );
}

export default ButtonResolve;