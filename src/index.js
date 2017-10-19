import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import registerServiceWorker from "./registerServiceWorker";

import App from "./App";
import Product from "./components/product/product";
import Search from "./components/search/search";
import ProductList from "./components/productlist/productlist";
import Activities from "./components/activities/activities";
import City from "./components/city/city";
import Sale from "./components/sale/sale";
import Category from "./components/category/category";
import Cart from "./components/cart/cart";
import CheckOut from "./components/checkout/checkout";
import User from "./components/user/index/index";
import UserOrder from "./components/user/order/order";

let createRoot = (function () {
    let root = document.createElement("div");
    root.setAttribute("id", "root");
    return root;
})();

document.body.appendChild(createRoot);

ReactDOM.render((
    <Router>
        <div className="app">
            <Route exact path="/" component={App} />
            <Route path="/search" component={Search} />
            <Route path="/product" component={Product} />
            <Route path="/productList" component={ProductList} />
            <Route path="/activities" component={Activities} />
            <Route path="/city" component={City} />
            <Route path="/sale" component={Sale} />
            <Route path="/category" component={Category} />
            <Route path="/cart" component={Cart} />
            <Route path="/checkOut" component={CheckOut} />
            <Route exact path="/user" component={User} />
            <Route path="/user/order" component={UserOrder} />
            <Route path="/user/coupon" component={UserOrder} />
            <Route path="/user/balance" component={UserOrder} />
            <Route path="/user/phone" component={UserOrder} />
            <Route path="/user/address" component={UserOrder} />
            <Route path="/help" component={UserOrder} />
        </div>
    </Router>
), createRoot);

registerServiceWorker();