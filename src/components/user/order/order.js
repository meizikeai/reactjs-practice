import React, { Component } from "react";
import "whatwg-fetch";

import Header from "../../model/header/header";
import ModelLayer from "../../model/model-layer/model-layer";

import "./order.css";

export default class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            info: {},
            code: "all"
        }
    }

    componentDidMount() {
        console.log(2);

        //正确姿势 - 因已返回全部数据，其它的状态，可以从这里面找出来~建议循环归类，切换时直接拿来用~
        //下接加载没做 - 下接的话要push数据，同上
        //这里使用多次请求的方式（不建议这样子做） -- 锡坤 
        this.handleFetch();
    }

    handleFetch(e) {
        let self = this;
        let code = e ? e.code : this.state.code;

        fetch("../server/user-order-" + code + ".json", {
            method: "get"
        }).then(function (response) {
            return response.json();
        }).then(function (json) {
            self.setState({ info: json });
        }).catch(function (ex) {
            console.log("parsing failed", ex);
        });
    }

    handleClick(e) {
        this.setState({
            code: e.code
        });

        this.handleFetch(e);
    }

    createTitle() {
        var titleInfo = [
            {
                name: "全部",
                code: "all"
            }, {
                name: "待付款",
                code: "waitPay"
            }, {
                name: "待发货",
                code: "waitSend"
            }, {
                name: "待收货",
                code: "waitConfirm"
            }, {
                name: "待评价",
                code: "waitRate"
            }
        ];

        return <div className="app-user-order-title">
            <ul>
                {
                    titleInfo.map((item, index) => {
                        return <li key={index}
                            className={this.state.code === item.code ? "cursor" : ""}
                            onClick={this.handleClick.bind(this, item)}
                            data-code={item.code}>{item.name}</li>;
                    })
                }
            </ul>
        </div>
    }

    handleTipLayer = (e) => {
        console.log(window.singleton);
        window.AppUnitLayer.show({
            content: "不要再点点点的啦，这个功能页面不想写了~"
        });
    }

    createTemplate() {
        if (this.state.info.success) {
            let group = this.state.info.group;
            let result = undefined;

            let groupHTML = group.map((e, k) => {
                let count = Object.keys(e);
                let every = e[count];

                let template = every.map((o, i) => {
                    if (o.cellType === "storage") {
                        let store = o.cellData[0].fields.sellerId;

                        return <div key={i} className={"module-" + o.cellType}>
                            <div data-id={store}></div>
                        </div>;
                    }

                    if (o.cellType === "seller") {
                        let store = o.cellData[0]; //不想再循环了 -- 你打我啊~
                        let state = o.cellData[1]; //不想再循环了 -- 你打我啊~

                        return <div key={i} className={"module-" + o.cellType}>
                            <div className="seller">
                                <div className="picture"><img src={store.fields.shopImg} alt={store.fields.shopName} /></div>
                                <div className="contact">
                                    <a href={"/user/order?id=" + store.fields.id}>
                                        <span className="title">{store.fields.shopName}</span>
                                        <span className="arrow"></span>
                                    </a>
                                </div>
                                <div className="state">
                                    <p>{state.fields.text}</p>
                                </div>
                            </div>
                        </div>;
                    }

                    if (o.cellType === "item") {
                        let store = o.cellData[0];
                        let service = o.cellData[1];
                        let { picture, info } = {};

                        if (store.fields.pic) {
                            picture = <div className="picture">
                                <img src={store.fields.pic} alt={store.fields.title} />
                            </div>
                        }

                        if (service) {
                            info = <div className="service">{service.fields.main.map((v, b) => <span key={b} data-id={v.id}>{v.name}</span>)}</div>;
                        }

                        return (<div key={i} className={"module-" + o.cellType}>
                            <div className={"item " + (store.fields.pic ? "" : "item-2")}>
                                {picture}
                                <div className="info">
                                    <h3 className="title">{store.fields.title}</h3>
                                    <p className="sku">{store.fields.skuText}</p>
                                    {info}
                                </div>
                                <div className="pay">
                                    <p className="price">{store.fields.priceInfo.original}</p>
                                    <p className="nums">x{store.fields.quantity}</p>
                                </div>
                            </div>
                        </div>);
                    }

                    if (o.cellType === "pay") {
                        let store = o.cellData[0].fields;

                        let { total, actualFee, postFee } = {};
                        if (store.total) {
                            total = <span>{store.total.prefix}<b>{store.total.value}</b>{store.total.suffix}</span>;
                        }
                        if (store.actualFee) {
                            actualFee = <span>{store.actualFee.prefix}<b>{store.actualFee.value}</b></span>;
                        }
                        if (store.postFee) {
                            postFee = <span>{store.postFee.prefix}<b>{store.postFee.value}</b>{store.postFee.suffix}</span>;
                        }

                        return <div key={i} className={"module-" + o.cellType}>
                            <div className="pay">
                                {total}{actualFee}{postFee}
                            </div>
                        </div>;
                    }

                    if (o.cellType === "option") {
                        let store = o.cellData[0].fields.values;
                        let type = {
                            tmallRateOrder: "评价",
                            tmallAppendRate: "追加评价",
                            delOrder: "删除订单",
                            viewLogistic: "查看物流",
                            applyInvoice: "开票申请"
                        };
                        let option = store.map((m, n) => <li
                            onClick={this.handleTipLayer}
                            className={m === "tmallRateOrder" ? "cursor" : ""}
                            data-name={m} key={n}>{type[m]}</li>).reverse();

                        return <div key={i} className={"module-" + o.cellType}>
                            <div className="option">
                                <ul>{option}</ul>
                            </div>
                        </div>;
                    }

                    return "";
                });

                return <li className="one" data-key={count} key={k}>{template}</li>;
            });

            if (group.length > 0) {
                result = <div className="app-user-order-list">
                    <ul className="user-order-list">{groupHTML}</ul>
                </div>;
            } else {
                result = <div className="app-user-error">
                    <div className="user-error">
                        <div className="picture"></div>
                        <p className="txt">您还没有相关的订单</p>
                        <p className="sub-txt">可以去看看有哪些想买</p>
                        <p className="refresh"><a href="/">随便逛逛</a></p>
                    </div>
                </div>;
            }

            return result;
        }
    }

    render() {
        const createTitle = this.createTitle();
        const createTemplate = this.createTemplate();

        return (
            <div className="page-app-user-order">
                <Header title="订单管理" />
                {createTitle}
                {createTemplate}
                <ModelLayer />
            </div>
        );
    }
}