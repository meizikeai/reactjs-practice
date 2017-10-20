import React, { Component } from "react";
import "./block-hot-product.css";

export default class DoubleProduct extends Component {
    // constructor(props) {
    //     super(props)
    // }

    render() {
        const data = this.props.data;
        const detail = data.items;

        // {
        //     "sku": "20-188-0046",
        //     "title": "奶蓟草片",
        //     "img": "/images/three-left-02-1.jpg",
        //     "price": "799.00",
        //     "sales": "抢5倍膨胀",
        //     "sort": 1
        // },

        const createHTML = detail.map((item, index) => {
            return <div className="every" key={index}>
                <a className="pro-one"
                    data-id={item.sku}
                    href={"./product?id=" + item.sku}
                    style={{
                        border: "solid " + this.props.bgcolor,
                        borderWidth: "0 0.5px 0.5px 0"
                    }}>
                    <div className="pro-img">
                        <img src={item.img} alt={item.sales} />
                    </div>
                    <p className="pro-name">{item.title}</p>
                    <div className="pro-price">
                        <span>￥{item.price.toFixed(2)}</span>
                    </div>
                    <div className="pro-sales">
                        <span>{item.sales}</span>
                    </div>
                </a>
            </div>
        });

        return (
            <div className="block-hot-product" data-id={detail.itemid}>
                <div className="product">
                    {createHTML}
                </div>
            </div>
        );
    }
}