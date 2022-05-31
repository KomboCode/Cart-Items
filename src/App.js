import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/home';
import Navbar from './components/navbar';
import SingleItem from './components/singleItem';
import Cart from './components/cart';
import ProductContextProvider from './contexts/productContext';
import CartContextProvider from './contexts/cartContext';

function App () {
  return (
      <section className='app'>
        <ProductContextProvider>
          <CartContextProvider>
            <Navbar/>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/cart" component={Cart}/>
              <Route path="/singleItem" component={SingleItem}/>
            </Switch>
          </CartContextProvider>
        </ProductContextProvider>
      </section>   
  )
}

export default App;