import React, { Component } from "react";
import "./header.css";

export default class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            click: true,
            entry: "entry",
            seet: "app-seet"
        };
    }

    componentDidMount() {
        if (typeof this.props.handleHeaderHeight === "function") {
            this.props.handleHeaderHeight(this.refs.header.clientHeight);
        }

        window.addEventListener("resize", this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleResize);
    }

    handleResize = () => {
        if (typeof this.props.handleHeaderHeight === "function") {
            setTimeout(() => {
                this.props.handleHeaderHeight(this.refs.header.clientHeight);
            }, 300);
        }
    }

    handleBack = (e) => {
        window.history.back();
    }

    handleCatalog = (e) => {
        if (this.state.click) {
            this.setState({
                click: false,
                entry: "entry app-block",
                seet: "app-seet app-block"
            });
        } else {
            this.setState({
                click: true,
                entry: "entry",
                seet: "app-seet"
            });
        }
    }

    handleEmpty = (e) => {
        this.setState({
            click: true,
            entry: "entry",
            seet: "app-seet"
        });
    }

    render() {
        return (
            <div className="app-header">
                <div className="header" ref="header">
                    <span className="back" onClick={this.handleBack}></span>
                    <div className="title">{this.props.title}</div>
                    <div className="pull" onClick={this.handleCatalog}><span></span></div>
                    <div className={this.state.entry}>
                        <div className="content">
                            <a href="/"><i className="home"></i><span>首页</span></a>
                            <a href="/category"><i className="category"></i><span>分类</span></a>
                            <a href="/cart"><i className="cart"></i><span>购物车</span></a>
                            <a href="/user"><i className="user"></i><span>我的</span></a>
                        </div>
                    </div>
                </div>
                <div className={this.state.seet} onClick={this.handleEmpty}></div>
            </div>
        );
    }
}