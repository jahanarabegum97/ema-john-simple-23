import { getShoppingCart } from "../utilities/fakedb";

const cartProductsLoader = async () => {
    const loadersProducts = await fetch('products.json')
    const products = await loadersProducts.json();

    // if cart data is an database, you have to async await
    const storedCart = getShoppingCart();
    // console.log(storedCart);
    const savedCart = []

    for(const id in storedCart){
      const addedProduct = products.find(pd => pd.id === id);
      if(addedProduct){
        const quantity = storedCart[id];
        addedProduct.quantity = quantity;
        savedCart.push(addedProduct)
      }
    }
    // //1. if you need to send to things
    // return [products,savedCart];

    // // 2.another option
    // return {products, cart:savedCart}

      // 3.option
    return savedCart;

  // console.log(products);
  // return products;
    
}

export default cartProductsLoader;

