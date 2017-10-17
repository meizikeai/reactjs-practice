import React, { Component } from "react";
import "./doubleproduct.css";

export default class DoubleProduct extends Component {
    // constructor(props) {
    //     super(props)
    // }

    render() {
        const data = this.props.data;
        const detail = data.items;

        const createHTML = detail.map((item, index) => {
            let productdetail = item.extra.productdetail;

            return <li className={(index + 1) % 2 ? "" : "pro-line"} key={index}>
                <div className="pro-one">
                    <div className="pro-img">
                        <a data-id={item.itemid} href={item.jumpurl}>
                            <img src={item.imgurl} alt={item.imgname} />
                        </a>
                    </div>
                    <div className="pro-name">
                        {productdetail.ismiaowgoods ? <i></i> : ""}{productdetail.name}
                    </div>
                    <div className={"pro-price " + (productdetail.isexclusivemobile ? "phone-enjoy" : "")}>
                        <span className="sell">￥<b>{productdetail.price.toFixed(2)}</b></span>
                        <span className="market">￥<s>{productdetail.marketprice.toFixed(2)}</s></span>
                    </div>
                    <div className={"pro-prom " + (productdetail.prmotionlist.length > 0 ? "" : "pro-none")}>
                        {productdetail.prmotionlist.length ? productdetail.prmotionlist[0].plabel : ""}
                    </div>
                </div>
            </li>
        });

        return (
            <div className="model-product-double" data-id={detail.itemid}>
                <div className="product-title"><h3>精选好货</h3><i></i></div>
                <ul className="product-double">
                    {createHTML}
                </ul>
            </div>
        );
    }
}