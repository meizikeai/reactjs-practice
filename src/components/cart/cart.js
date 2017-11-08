import React, { Component } from "react";
import "whatwg-fetch";

import Header from "../model/header/header";
import "./cart.css";

export default class Cart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            info: {},
            fullCount: 0
        }

        //暂停搞这个页面
    }

    componentDidMount() {
        console.log(2);
        let self = this;

        fetch("./server/cart.json", {
            method: "get"
        }).then(function (response) {
            return response.json();
        }).then(function (json) {
            let result = json.data;
            let resource = result.data;
            let hierarchy = result.hierarchy;
            let fullCount = 0;

            if (resource && hierarchy) {
                let structure = hierarchy.structure[hierarchy.root];
                let e = 0;
                for (e in structure) {
                    if (structure[e] === "allitem") {
                        fullCount = resource[structure[e]].fields.value;
                    }
                }
            }

            self.setState({
                info: json,
                fullCount: fullCount
            });

            console.log(result);
        }).catch(function (ex) {
            console.log("parsing failed", ex);
        });
    }

    handleSubmit() {
        window.location.href = "/checkout";
    }

    createTemplate() {
        if (this.state.info.success) {
            let result = this.state.info.data;
            let resource = result.data;
            let hierarchy = result.hierarchy;

            let fullhtml = "";

            let handleShopHTML = (data) => {
                let fields = data.fields;

                return <div className="shop" data-id={data.id}>
                    <div className="shop-title">
                        <div className="check">
                            <p>
                                <input className="checkbox" id={"love-" + data.id} type="checkbox" defaultChecked={fields.checked} />
                                <label htmlFor={"love-" + data.id}></label>
                            </p>
                        </div>
                        <div className="ico">
                            <span></span>
                        </div>
                        <div className="contact">
                            <a href={fields.url + fields.shopId}>
                                <p className="title">{fields.title}</p>
                                <p className="arrow"></p>
                            </a>
                        </div>
                        <div className="state">
                            <p className="edit">编辑</p>
                        </div>
                    </div>
                    {fields.coudan ? <div className="coudan">
                        <div className="icon">
                            <img src={fields.coudan.pic} alt={fields.coudan.title} />
                        </div>
                        <div className="box">
                            <div className="title">{fields.coudan.title}</div>
                            <span></span>
                        </div>
                    </div> : ""}
                </div>
            };

            let handleItemHTML = (data) => {
                let fields = data.fields;
                let total = fields.pay.totalTitle.split(".");
                let currency = total[0].replace(/\d/ig, "");

                return <div className="each" data-id={data.id}>
                    <div className="scheme">
                        <div className="content">
                            <div className="check">
                                <p>
                                    <input className="checkbox" id={"love-" + data.id} type="checkbox" defaultChecked={fields.checked} />
                                    <label htmlFor={"love-" + data.id}></label>
                                </p>
                            </div>
                            <div className="detail">
                                <div className="picture">
                                    <a href={fields.url + fields.itemId}>
                                        <img src={fields.pic} alt={fields.title} />
                                    </a>
                                </div>
                                <div className="info">
                                    <a href={fields.url + fields.itemId}>
                                        <h3>{fields.title}</h3>
                                        {
                                            fields.sku ? <div className="sku">
                                                <p>{fields.sku.title}</p>
                                            </div> : ""
                                        }
                                    </a>
                                    <div className="pay">
                                        <div className="price">
                                            <div className="sale">
                                                <span>{currency}</span>
                                                <span className="major">{total[0].replace(/\D/ig, "")}</span>
                                                <span className="point">.</span>
                                                <span className="minor">{total[1]}</span>
                                            </div>
                                            <div className="origin">
                                                <del>{fields.pay.originTitle}</del>
                                            </div>
                                        </div>
                                        <div className="quantity">
                                            <span>x</span>
                                            <span>{fields.quantity.quantity}</span>
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
            }

            if (resource && hierarchy) {
                let structure = hierarchy.structure;
                let root = hierarchy.structure[hierarchy.root];

                fullhtml = ((e) => {
                    return e.map((e, k) => {
                        if (e && structure[e]) {
                            return structure[e].map((o, i) => {
                                if (o && structure[o]) {
                                    return <div className="bundle" key={i}>
                                        {
                                            structure[o].map((d, l) => {
                                                if (d && structure[d]) {
                                                    return <div className="group" key={l}>
                                                        {
                                                            structure[d].map((q, j) => {
                                                                return <div className="main" key={j}>
                                                                    {
                                                                        handleItemHTML(resource[q])
                                                                    }
                                                                </div>;
                                                            })
                                                        }
                                                    </div>;
                                                } else {
                                                    return <div className="head" key={l}>
                                                        {
                                                            handleShopHTML(resource[d])
                                                        }
                                                    </div>;
                                                }
                                            })
                                        }
                                    </div>
                                } else {
                                    let footer = resource[o];
                                    let price = footer.fields.pay.priceTitle.replace("￥", "").split(".");

                                    console.log(footer);
                                    return <div className="footer" key={i}>
                                        <div className="foot-fixed">
                                            <div className="foot">
                                                <div className="check">
                                                    <p>
                                                        <input id="cb-footer" type="checkbox" className="checkbox" defaultChecked={footer.fields.checkAll.checked} />
                                                        <label htmlFor="cb-footer"></label>
                                                    </p>
                                                </div>
                                                <div className="choice">全选</div>
                                                <div className="pay">
                                                    <div className="total">合计：</div>
                                                    <p className="price" data-symbol="￥">
                                                        <span>￥</span>
                                                        <span className="major">{price[0]}</span>
                                                        <span className="point">.</span>
                                                        <span className="minor">{price[1]}</span>
                                                    </p>
                                                </div>
                                                <div className="submit" onClick={this.handleSubmit}>
                                                    <p>
                                                        <span>结算</span>
                                                        <span>(</span>
                                                        <span>{footer.fields.quantity.value}</span>
                                                        <span>)</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>;
                                }
                            });
                        } else {
                            return "";
                        }
                    });
                })(root);
            }

            return <div className="app-cart">
                <div className="cart-thing">
                    {fullhtml}
                </div>
            </div>
        }
    }

    render() {
        const createTemplate = this.createTemplate();

        return (
            <div className="page-app-cart">
                <Header title={"购物车" + (this.state.fullCount > 0 ? "(" + this.state.fullCount + ")" : "")} />
                {createTemplate}
            </div>
        );
    }
}