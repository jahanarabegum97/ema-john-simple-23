import React, { useEffect, useState } from "react";
import "./Shop.css";
import Product from "../Product/Product";
import Cart from "../Cart/Cart";
import { addToDb, deleteShoppingCart, getShoppingCart } from "../../utilities/fakedb";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowRight} from '@fortawesome/free-solid-svg-icons'

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

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

  useEffect(() => {
    const storedCart = getShoppingCart();
    const savedCart = [];
    // step-1: get id of the added product/ stored product
    for (const id in storedCart) {
      // step-2: get product from products state by using id
      const addedProduct = products.find((product) => product.id === id);
      // console.log('addedProduct',addedProduct);
      if (addedProduct) {
        // step-3: add quantity
        const quantity = storedCart[id];
        addedProduct.quantity = quantity;
        // step: 4 add the added Product to the saved cart.
        savedCart.push(addedProduct);
      }
    }
    // step-5 Set the cart
    setCart(savedCart);
  }, [products]);

  // // age ei toko chilo
  //       // event handlers
  //       const handleAddToCart = (product)=>{
  //         // console.log('product added', product)
  //         // console.log(product)
  //        const newCart = [...cart,product];
  //        setCart(newCart);
  //        addToDb(product.id)
  //     }

  // event handlers
  const handleAddToCart = (product) => {
    // console.log('product added', product)
    // console.log(product)
    //    const newCart = [...cart,product];

    // cart.push(Product);
    let newCart = [];
    // const newCart = [...cart, product];
    // if product doesn't exist in the cart, then set quantity = 1
    // if exist update quantity by 1
    const exists = cart.find((pd) => pd.id === product.id);
    if (!exists) {
      product.quantity = 1;
      newCart = [...cart, product];
    } else {
      exists.quantity = exists.quantity + 1;
      const remaining = cart.filter((pd) => pd.id !== product.id);
      newCart = [...remaining, exists];
    }

    setCart(newCart);
    addToDb(product.id);
  };

  const handleClearCart = ()=>{
    setCart([]);
    deleteShoppingCart()
  }

  return (
    <div className="shop-container">
      <div className="products-container">
        {/* <h2>Products coming here: {products.length}</h2> */}
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            handleAddToCart={handleAddToCart}
          ></Product>
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart} handleClearCart={handleClearCart}> 
        {/* <div>From Shop</div> */}
        <Link className="proceed-link" to="/orders">
          <button className='btn-proceed'><span>Review Order</span><FontAwesomeIcon icon={faArrowRight} /></button>
        </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;
