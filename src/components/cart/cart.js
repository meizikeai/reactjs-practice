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
                <div className="cart-thing">
                    <div className="bundle">
                        <div className="shop" data-reactid="">
                            <div className="shop-title">
                                <div className="check">
                                    <p>
                                        <input className="checkbox" id="cb-150813973007821" type="checkbox" />
                                        <label htmlFor="cb-150813973007821"></label>
                                    </p>
                                </div>
                                <div className="ico">
                                    <span></span>
                                </div>
                                <div className="contact">
                                    <a href="//shop.m.taobao.com/shop/shop_index.htm?shop_id=61773004">
                                        <p className="title">veromoda官方旗舰</p>
                                        <p className="arrow"></p>
                                    </a>
                                </div>
                                <div className="state">
                                    <p className="edit">编辑</p>
                                </div>
                            </div>
                            <div className="coudan">
                                <div className="icon">
                                    <img src="//img.alicdn.com/tfs/TB1GulZSVXXXXaWXVXXXXXXXXXX-129-36.png" alt="" />
                                </div>
                                <div className="box">
                                    <div className="title">满2件,享包邮</div>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                        <div className="group ">
                            <div className="each">
                                <div className="scheme" data-status="open">
                                    <div className="content">
                                        <div className="check">
                                            <p>
                                                <input className="checkbox" id="cb-150813973008024" type="checkbox" />
                                                <label htmlFor="cb-150813973008024"></label>
                                            </p>
                                        </div>
                                        <div className="detail">
                                            <div className="picture">
                                                <a href="//a.m.taobao.com/i551881638423.htm">
                                                    <img src="https://gw.alicdn.com/bao/uploaded/i3/420567757/TB2BWhyXTAKh1JjSZFDXXbKlFXa-420567757.jpg_200x200q50s150.jpg_.webp" alt="" />
                                                </a>
                                            </div>
                                            <div className="info">
                                                <a href="//a.m.taobao.com/i551881638423.htm">
                                                    <h3>Vero Moda2017秋季新品印花A字裙摆七分袖连衣裙|31737C505</h3>
                                                    <div className="sku">
                                                        <p>E39深蓝色;155/76A/XS</p>
                                                    </div>
                                                </a>
                                                <div className="pay">
                                                    <div className="price">
                                                        <div className="sale">
                                                            <span>￥</span>
                                                            <span className="major">699</span>
                                                            <span className="point">.</span>
                                                            <span className="minor">00</span>
                                                        </div>
                                                        <div className="origin">
                                                            <del>￥269.00</del>
                                                        </div>
                                                    </div>
                                                    <div className="quantity">
                                                        <span>x</span>
                                                        <span>1</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="del edit-del">
                                            <p>删除</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="option hide">
                                    <div className="del edit-del">
                                        <p>删除</p>
                                    </div>
                                </div>
                            </div>
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