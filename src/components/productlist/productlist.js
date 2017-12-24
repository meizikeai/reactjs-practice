import React, { Component } from "react";

import Header from "../model/header/header";
import Footer from "../model/footer/footer";
import "./productlist.css";

export default class ProductList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            info: {},
            initcode: 1,
            every: [
                { name: "默认", code: 1 },
                { name: "销量", code: 2 },
                { name: "价格", code: 3 }
            ]
        }
    }

    componentDidMount() {
        this.handleFetch();
    }

    handleFetch(e) {
        let self = this;
        let code = e ? e.code : this.state.initcode;
        let search = e ? e.search : "";

        fetch("./server/productlist-" + code + ".json?code=" + code + search, {
            method: "get"
        }).then(function (response) {
            return response.json();
        }).then(function (json) {
            self.setState({ info: json });
        }).catch(function (ex) {
            console.log("parsing failed", ex);
        });
    }

    getUrlParam = (search, name) => {
        let regexp = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        let data = search && search.substring(1).match(regexp);
        return data && decodeURIComponent(data[2]);
    }

    handleEvery(e) {
        this.setState({
            initcode: e.code
        });

        if (e.code !== 4) {
            this.handleFetch(e);
        }
    }

    createEvery() {
        let every = this.state.every;
        let result = every.map((item, index) => {
            return <div className="every" key={index} onClick={this.handleEvery.bind(this, item)}>
                <div className={"key" + (index === 0 ? " first" : "") + (index + 1 === this.state.initcode ? " current" : "")}>
                    <span>{item.name}</span>
                </div>
            </div>
        });

        return <div className="app-productlist-class">{result}</div>;
    }

    createTemplate() {
        if (this.state.info.success) {
            let data = this.state.info.data;
            let productlist = data.productlist;
            let result = productlist.map((item, index) => {
                return <li className={(index + 1) % 2 ? "" : "pro-line"} key={index}>
                    <div className="pro-one">
                        <div className="pro-img">
                            <a data-id={item.itemcode} href={item.jumpurl}>
                                <img src={item.image} alt={item.name} />
                            </a>
                        </div>
                        <div className="pro-name">
                            {item.ismiaowgoods ? <i></i> : ""}{item.name}
                        </div>
                        <div className={"pro-price " + (item.isexclusivemobile ? "phone-enjoy" : "")}>
                            <span className="sell">￥<b>{item.ytprice.toFixed(2)}</b></span>
                            <span className="market">￥<s>{item.price.toFixed(2)}</s></span>
                        </div>
                        <div className={"pro-prom " + (item.promotionlist.length > 0 ? "" : "pro-none")}>
                            {item.promotionlist.length ? item.promotionlist[0].plabel : ""}
                        </div>
                    </div>
                </li>
            });

            return <div className="app-product-list">
                <ul className="product-double">{result}</ul>
            </div>
        }
    }

    render() {
        const createEvery = this.createEvery();
        const createTemplate = this.createTemplate();
        const keyword = '"' + this.getUrlParam(this.props.location.search, "title") + '"';

        return (
            <div className="page-app-product-list">
                <Header title={keyword + "的商品列表"} />
                {createEvery}
                {createTemplate}
                <Footer />
            </div>
        );
    }
}