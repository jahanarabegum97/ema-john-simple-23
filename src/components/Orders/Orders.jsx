import React, { useState } from 'react';
import Cart from '../Cart/Cart';
import { Link, useLoaderData } from 'react-router-dom';
import './Orders.css'
import ReviewItem from '../ReviewItem/ReviewItem';
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowRight} from '@fortawesome/free-solid-svg-icons'

const Orders = () => {
    // age eita dia krcilam loader
    // const cart = useLoaderData();
    // // console.log(cart);

    const savedCart = useLoaderData([])
    // console.log(savedCart);
    const [cart, setCart] = useState(savedCart);

    const handleRemoveFromCart = (id)=>{
        // console.log(id);
        const remaining = cart.filter(product => product.id !==id);
        setCart(remaining);
        removeFromDb(id)
    }

    const handleClearCart =()=>{
        setCart([]);
        deleteShoppingCart()
    }

    return (
        <div className='shop-container'>
           <div className='review-container'>
           {/* <h3>Orders page: {cart.length}</h3>  */}
           {
            cart.map(product=><ReviewItem key={product.key} product={product} handleRemoveFromCart={handleRemoveFromCart}></ReviewItem>)
           }
        
           </div>
           <div className='cart-container'>
            {/* <Cart cart={[]}></Cart> */}
            <Cart cart={cart} handleClearCart={handleClearCart}>
            {/* <div>From Orders/Inside Orders</div> */}
            <Link className='proceed-link' to="/checkout"><button className='btn-proceed'><span>Proceed checkout<FontAwesomeIcon icon={faArrowRight} /></span></button></Link>
            </Cart>
           </div>
        </div>
    );
};

export default Orders;