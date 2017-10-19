import React, { Component } from "react";
import "whatwg-fetch";

import Header from "../model/header/header";
import Footer from "../model/footer/footer";
import "./sale.css";

export default class Sale extends Component {
    constructor(props) {
        super(props);

        this.state = {
            initcode: 1,
            sale: {},
            info: {},
            list: {}
        }
    }

    componentDidMount() {
        let self = this;

        fetch("./server/sale-0.json", {
            method: "get"
        }).then(function (response) {
            return response.json();
        }).then(function (json) {
            self.setState({ sale: json });
        }).catch(function (ex) {
            console.log("parsing failed", ex);
        });

        this.handleFetch();
    }

    handleFetch(e) {
        let self = this;
        let code = e ? e.code : this.state.initcode;

        fetch("./server/sale-" + code + ".json?code=" + code, {
            method: "get"
        }).then(function (response) {
            return response.json();
        }).then(function (json) {
            if (code !== 3) {
                self.setState({
                    info: json
                });
            } else {
                self.setState({
                    list: json
                });
            }
        }).catch(function (ex) {
            console.log("parsing failed", ex);
        });
    }

    handleEvery(e) {
        this.setState({
            initcode: e.code
        });
        this.handleFetch(e);
    }

    createEvery() {
        if (this.state.sale.success) {
            let every = this.state.sale.data;
            let result = every.map((item, index) => {
                return <div className="every" key={index} onClick={this.handleEvery.bind(this, item)}>
                    <div className={"key " + (index + 1 === this.state.initcode ? "current" : "")}>
                        <span>{item.name}</span>
                    </div>
                </div>
            });

            return <div className="app-sale">{result}</div>;
        }
    }

    countDown(e) {
        let self = this;
        let code = this.state.initcode;
        let data = this.state.info.data;
        let result = data.activityinfo[0].activitylist;
        let { day, hour, minute, startTime } = {};

        clearInterval(self.interval);

        self.interval = setInterval(function () {

            for (let i = 0; i < result.length; i++) {
                let temp = result[i];

                startTime = new Date(temp.starttime);

                if (temp.second < 0) {
                    temp.html = "";
                    temp.text = "已结束";
                } else if (code === 4) { //预告
                    temp.html = <i></i>;
                    temp.text = (startTime.getMonth() + 1) + "月" + startTime.getDate() + "日";
                } else { //进行中
                    day = Math.floor(temp.second / 86400);
                    hour = Math.floor((temp.second % 86400) / 3600);
                    if (day >= 1) { //显示天
                        temp.html = <i></i>;
                        temp.text = "剩" + day + "天";
                    } else if (hour >= 1) { //显示小时
                        temp.html = <i></i>;
                        temp.text = "剩" + hour + "小时";
                    } else {
                        minute = Math.floor(((temp.second % 86400) % 3600) / 60);
                        if (minute <= 0) {
                            temp.html = <i></i>;
                            temp.text = "剩1分钟";
                        } else {
                            temp.html = <i></i>;
                            temp.text = "剩" + minute + "分钟";
                        }
                    }
                }

                temp.second--;

                self.setState({
                    data: temp
                });
            }

        }, 1000);
    }

    createTemplate() {
        if (this.state.info.success && this.state.initcode !== 3) {
            let result = this.state.info.data;

            this.countDown();

            let activity = result.activityinfo[0].activitylist;
            let tempHTML = activity.map((item, index) => {
                return <div className="active" key={index}>
                    <div className="link">
                        <a href={"/ProductList?condition=" + item.id + "&title=" + item.title}>
                            <img src={item.imgurl} alt={item.name} />
                            <span className="discount">{item.discount}</span>
                        </a>
                    </div>
                    <div className="info cf">
                        <span className="name">{item.name}</span>
                        <span className="countdown" data-second={item.second} data-start={item.starttime}>
                            {item.html}{item.text}
                        </span>
                    </div>
                </div>
            });

            return <div className="app-activity">{tempHTML}</div>

        } else if (this.state.list.success && this.state.initcode === 3) {
            let result = this.state.list.data;
            let activity = result.productlist;

            let tempHTML = activity.map((item, index) => {
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

            return <div className="app-activity">
                <ul className="activity-list">{tempHTML}</ul>
            </div>
        }
    }

    render() {
        const createEvery = this.createEvery();
        const createTemplate = this.createTemplate();

        return (
            <div className="page-app-sale">
                <Header title="抢先" />
                {createEvery}
                {createTemplate}
                <Footer path={this.props.location.pathname} />
            </div>
        );
    }
}