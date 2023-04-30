import React from 'react';
import './Product.css'
const Product = (props) => {
    // console.log(props.product)
    const {img,name,seller, ratings,quantity,price} = props.product;
    return (
        <div className='product'>
            <img src={img} alt="" />
            <div className='product-info'>
            <h6 className='product-name'>{name}</h6>
            <p>Price: ${price}</p>
            <p>Manufacturer: {seller}</p>
            <p>rating: {ratings} Starts</p>
            </div>
            <div>
                <button className='btn-cart'>Add to Cart</button>
            </div>
        </div>
    );
};

export default Product;