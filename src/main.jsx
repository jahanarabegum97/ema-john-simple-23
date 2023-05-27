import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Shop from './components/Shop/Shop.jsx';
import Orders from './components/Orders/Orders.jsx';
import Inventory from './components/Inventory/Inventory.jsx';
import Login from './components/Login/Login.jsx';
import Home from './components/Layout/Home.jsx';
import cartProductsLoader from './Loaders/CartProductsLoader.js';
import Checkout from './components/Checkout/Checkout.jsx';
const router = createBrowserRouter([
  {
    path:'/',
    element:<Home></Home>,
    children:[
      {
        path:'/',
        element:<Shop></Shop>
      },
      {
        path:'orders',
        element:<Orders></Orders>,
        // loader:()=> fetch('products.json') ei ta na lekheo nicer ei function ta onno file theke nia o ashte pari.custom kre
        loader:cartProductsLoader
      },
      {
        path:'inventory',
        element:<Inventory></Inventory>
      },
      {
        path:'checkout',
        element:<Checkout></Checkout>
      },
      {
        path:'login',
        element:<Login></Login>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)

