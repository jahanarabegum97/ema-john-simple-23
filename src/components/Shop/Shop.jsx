import React, { useEffect, useState } from 'react';
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';

const Shop = () => {
    const [products, setProducts] = useState([])
    const [cart,setCart] = useState([])

    useEffect(()=>{
        fetch('products.json')
        .then(res=> res.json())
        .then(data => setProducts(data))
    }, [])

//  // localStorage
//    useEffect(()=>{
//     console.log('products',products)
//     const storedCart = getShoppingCart();
//     // console.log(storedCart);
//     // step 2: get id
//     for(const id in storedCart){
//         // console.log(id);
//         // step-2: get the product by using id
//         const addedProduct = products.find(product =>product.id ===id);
//         // console.log(addedProduct);
//         // step-3: get quantity of the product
//         const quantity = storedCart[id];
//         addedProduct.quantity = quantity;
//         console.log(addedProduct);
//     }
//    },[products])


useEffect(()=>{
    const storedCart = getShoppingCart()
    const savedCart = []
    // step-1: get id of the added product/ stored product
    for(const id in storedCart){
        // step-2: get product from products state by using id
        const addedProduct = products.find(product =>(product.id === id));
        // console.log('addedProduct',addedProduct);
        if(addedProduct){
            // step-3: add quantity
            const quantity = storedCart[id]
            addedProduct.quantity = quantity;
            // step: 4 add the added Product to the saved cart.
            savedCart.push(addedProduct);
        }
    }
    // step-5 Set the cart
    setCart(savedCart)

},[products])


// age ei toko chilo
      // event handlers
      const handleAddToCart = (product)=>{
        // console.log('product added', product)
        // console.log(product)
       const newCart = [...cart,product];
       setCart(newCart);
       addToDb(product.id)
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
            <Cart cart ={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;