import React, { useEffect, useState } from 'react';
import './Shop.css'
import Product from '../Prouduct/Product';

const Shop = () => {
    const [products, setProducts] = useState([])
    const [cart,setCart] = useState([])

    useEffect(()=>{
        fetch('products.json')
        .then(res=> res.json())
        .then(data => setProducts(data))
    }, [])

      // event handlers
      const handleAddToCart = (product)=>{
        // console.log('product added', product)
        // console.log(product)
       const newCart = [...cart,product];
       setCart(newCart);
    }

    return (
        <div className='shop-container'>
            <div className='products-container'>
            {/* <h2>Products coming here: {products.length}</h2> */}
            {
                products.map(product => <Product 
                key={product.id}
                 product={product}
                 handleAddToCart={handleAddToCart}
                 ></Product>)
            }
            </div>
            <div className='cart-container'>
            <h4>Order Summary</h4>
            <p>Selected Items: {cart.length}</p>
            </div>
        </div>
    );
};

export default Shop;