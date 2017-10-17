import React, { Component } from "react";
import "whatwg-fetch";

import Header from "../unit/header/header";
import "./cart.css";

export default class Cart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            info: {}
        }
    }

    componentDidMount() {
        console.log(2);
        let self = this;

        fetch("./server/cart.json")
            .then(function (response) {
                return response.json();
            }).then(function (json) {
                self.setState({ info: json });
            }).catch(function (ex) {
                console.log("parsing failed", ex);
            });
    }

    createTemplate() {
        if (this.state.info.success) {
            let result = this.state.info.data;

            return <div className="app-cart">
                <div className="bundle">
                    <div className="shop" data-reactid="">
                        <div className="title">
                            <div className="shopcb">
                                <p>
                                    <input id="cb-150813973007821" className="o-t-cb" type="checkbox" />
                                    <label htmlFor="cb-150813973007821"></label>
                                </p>
                            </div>
                            <div className="ico">
                                <span className="shopIco_B"></span>
                            </div>
                            <div className="contact">
                                <a href="//shop.m.taobao.com/shop/shop_index.htm?shop_id=61773004">
                                    <p className="title">veromoda官方旗舰</p>
                                    <p className="arrow">
                                        <span className="icon-right"></span>
                                    </p>
                                </a>
                            </div>
                            <div className="state">
                                <div className="state-cont">
                                    <p className="edit">编辑</p>
                                </div>
                            </div>
                        </div>
                        <div className="coudan">
                            <div className="ctrl-ui-label">
                                <div className="icon">
                                    <img src="//img.alicdn.com/tfs/TB1GulZSVXXXXaWXVXXXXXXXXXX-129-36.png" alt="" />
                                </div>
                                <div className="box full limitHeight">
                                    <div className="title">
                                        <div>
                                            <h2 className="titleSub">满2件,享包邮</h2>
                                        </div>
                                    </div>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="group ">
                        <div className="itemv2 edit-false">
                            <div className="item-box" data-status="open">
                                <div className="item-list o-t-item undefined">
                                    <div className="item-cb">
                                        <p>
                                            <input id="cb-150813973008024" type="checkbox" className="cb o-t-cb" />
                                            <label htmlFor="cb-150813973008024"></label>
                                        </p>
                                    </div>
                                    <div className="item-detail">
                                        <div>
                                            <div className="item-img">
                                                <a href="//a.m.taobao.com/i551881638423.htm">
                                                    <img className="" src="https://gw.alicdn.com/bao/uploaded/i3/420567757/TB2BWhyXTAKh1JjSZFDXXbKlFXa-420567757.jpg_200x200q50s150.jpg_.webp" alt="" data-src-checked="true" />
                                                </a>
                                            </div>
                                            <div className="item-info">
                                                <a href="//a.m.taobao.com/i551881638423.htm">
                                                    <h3 className="title">Vero Moda2017秋季新品印花A字裙摆七分袖连衣裙|31737C505</h3>
                                                    <div className="sku">
                                                        <p>E39深蓝色;155/76A/XS</p>
                                                    </div>
                                                </a>
                                                <div className="item-logos"></div>
                                                <div className="pay">
                                                    <div className="pay-price">
                                                        <div className="price">
                                                            <p className="o-t-price" data-symbol="￥">
                                                                <span>
                                                                    <span className="major">699</span>
                                                                    <span className="point">.</span>
                                                                    <span className="minor">00</span>
                                                                </span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="quantity">
                                                        <p>
                                                            <span>x</span>
                                                            <span>1</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item-del c-edit-delhide">
                                        <p>删除</p>
                                    </div>
                                </div>
                            </div>
                            <div className="op">
                                <div className="item-del c-edit-delhide">
                                    <p>删除</p>
                                </div>
                            </div>
                            <div className="op2"></div>
                        </div>
                    </div>
                </div>
            </div>
        }
    }

    render() {
        const createTemplate = this.createTemplate();

        return (
            <div className="page-app-cart">
                <Header title="购物车" />
                {createTemplate}
            </div>
        );
    }
}