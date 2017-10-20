import React, { Component } from "react";
import "./block-product.css";

export default class DoubleProduct extends Component {
    // constructor(props) {
    //     super(props)
    // }

    render() {
        const data = this.props.data;
        const detail = data.items;

        const createHTML = detail.map((item, index) => {
            return <div className="every" key={index}>
                <a className={"pro-one" + ((index + 1) % 2 ? "" : " pro-line")}
                    data-id={item.sku}
                    href={"./product?id=" + item.sku}>
                    <div className="pro-img">
                        <img src={item.img} alt={item.sales} />
                    </div>
                    <div className="pro-like">
                        <p className="pro-name">{item.title}</p>
                        <div className="pro-price">
                            <span className="sell">￥<b>{item.price.toFixed(2)}</b></span>
                            <span className="market">￥<s>{item.market.toFixed(2)}</s></span>
                        </div>
                        <div className="pro-sales">
                            <span>{item.sales}</span>
                        </div>
                    </div>
                    <div className={"pro-prom" + (item.feature ? "" : " pro-none")}>{item.feature}</div>
                </a>
            </div>
        });

        return (
            <div className="block-product" data-id={detail.itemid}>
                <div className="product-double">
                    {createHTML}
                </div>
            </div>
        );
    }
}