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
            <Route path="/Search" component={Search} />
            <Route path="/Product" component={Product} />
            <Route path="/ProductList" component={ProductList} />
            <Route path="/Activities" component={Activities} />
            <Route path="/City" component={City} />
            <Route path="/Sale" component={Sale} />
            <Route path="/Category" component={Category} />
            <Route path="/Cart" component={Cart} />
            <Route path="/CheckOut" component={CheckOut} />
            <Route path="/User" component={User} />
            <Route path="/Order" component={UserOrder} />
        </div>
    </Router>
), createRoot);

registerServiceWorker();