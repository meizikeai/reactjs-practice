import React, { Component } from "react";

import Header from "../../model/header/header";
import Footer from "../../model/footer/footer";

import ModeLayer from "../../model/model-layer/model-layer";
import ModelDownload from "../../model/model-download/model-download";

import "./index.css";

export default class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            info: {}
        }
    }

    componentDidMount() {
        console.log(2);
        let self = this;

        fetch("../server/user-index.json", {
            method: "get"
        }).then(function (response) {
            return response.json();
        }).then(function (json) {
            self.setState({ info: json });
        }).catch(function (ex) {
            console.log("parsing failed", ex);
        });
    }

    handleTipLayer = (e) => {
        ModeLayer.show({
            content: "不要再点点点的啦，这个功能页面不想写了~"
        });
    }

    createTemplate() {
        if (this.state.info.success) {
            let result = this.state.info.data;
            let info = result.info;
            let entry = result.entry;
            let other = result.other;

            return <div className="app-user">
                <header className="user">
                    <div className="state" data-id={info.userId} onClick={this.handleTipLayer}><p>设置</p></div>
                    <div className="photo">
                        <img src={info.userLogo} alt="头像" />
                    </div>
                    <div className="nick">
                        <p className="name">{info.userName}</p>
                        <p className={"level level" + info.userLevel}></p>
                    </div>
                </header>
                <section className="behavior">
                    <ul>
                        <li><a href=""><p>{info.favoriteItem}</p><p>收藏的宝贝</p></a></li>
                        <li><a href=""><p>{info.favoriteShop}</p><p>收藏的店铺</p></a></li>
                        <li><a href={info.footPrintsUrl}><p>{info.footPrints}</p><p>我的足迹</p></a></li>
                    </ul>
                </section>
                <section className="order">
                    <ul>
                        <li>
                            <a href="/user/order">
                                <p className="icons pay">{info.order2Pay > 0 ? <i className="number">{info.order2Pay}</i> : ''}</p>
                                <p className="sub">待付款</p>
                            </a>
                        </li>
                        <li>
                            <a href="/user/order">
                                <p className="icons send">{info.order2Deliver > 0 ? <i className="number">{info.order2Deliver}</i> : ''}</p>
                                <p className="sub">待发货</p>
                            </a>
                        </li>
                        <li>
                            <a href="/user/order">
                                <p className="icons deliver">{info.order2Receive > 0 ? <i className="number">{info.order2Receive}</i> : ''}</p>
                                <p className="sub">待收货</p>
                            </a>
                        </li>
                        <li>
                            <a href="/user/order">
                                <p className="icons evaluate">{info.order2Rate > 0 ? <i className="number">{info.order2Rate}</i> : ''}</p>
                                <p className="sub">待评价</p>
                            </a>
                        </li>
                    </ul>
                    <div className="label-act">
                        <a href="/user/order">
                            <div className="ico all"></div>
                            <div className="title"><p>全部订单</p></div>
                            <div className="arrow"></div>
                            <div className="sub">查看全部订单</div>
                        </a>
                    </div>
                </section>
                <section className="core-entry">
                    {
                        entry.map((e, k) => {
                            return <div className="label-act" key={k}>
                                <a href={e.url}>
                                    <div className="ico"><img src={e.img} alt={e.name} /></div>
                                    <div className="title"><p>{e.name}</p></div>
                                    <div className="arrow"></div>
                                    <div className="sub">{e.text}</div>
                                </a>
                            </div>
                        })
                    }
                </section>
                <section className="core-entry">
                    {
                        other.map((e, k) => {
                            return <div className="label-act" key={k}>
                                <a href={e.url}>
                                    <div className="ico"><img src={e.img} alt={e.name} /></div>
                                    <div className="title"><p>{e.name}</p></div>
                                    <div className="arrow"></div>
                                    <div className="sub">{e.text}</div>
                                </a>
                            </div>
                        })
                    }
                </section>
                <footer className="other">
                    {info.userName ? <div className="nick"><a href="">{info.userName}</a></div> : ""}
                    <div className="login"><a href="">退出</a></div>
                    <div className="feedback"><a href="">意见反馈</a></div>
                    <div className="topc"><a href="">电脑版</a></div>
                </footer>
            </div>
        }
    }

    render() {
        const createTemplate = this.createTemplate();

        return (
            <div className="page-app-user-index">
                <Header title="用户中心" />
                {createTemplate}
                <Footer path={this.props.location.pathname} />
                <ModelDownload />
            </div>
        );
    }
}