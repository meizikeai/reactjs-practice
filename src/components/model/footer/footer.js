import React, { Component } from "react";
import "./footer.css";

export default class Footer extends Component {
    constructor(props) {
        super(props);

        let path = this.props.path;

        this.state = {
            footer: [
                { path: "/", class: "home", name: "首页", check: (path === "/") ? true : false },
                { path: "/sale", class: "sale", name: "抢先", check: (path === "/sale") ? true : false },
                { path: "/category", class: "category", name: "分类", check: (path === "/category") ? true : false },
                { path: "/cart", class: "cart", name: "购物车", check: (path === "/cart") ? true : false },
                { path: "/user", class: "user", name: "我的", check: (path === "/user") ? true : false }
            ]
        };
    }

    render() {
        let footer = this.state.footer;

        return (
            <div className="app-footer">
                <div className="hold"></div>
                <div className="footer">
                    <div className="container">
                        <ul className="mian">
                            {
                                footer.map((item, index) => {
                                    return <li key={index}>
                                        <a href={item.path} className={item.class + " " + (item.check ? "cursor" : 0)}>
                                            <i></i><span>{item.name}</span>
                                        </a>
                                    </li>
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}