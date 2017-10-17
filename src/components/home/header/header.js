import React, { Component } from "react";
import "./header.css";

export default class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            city: localStorage.city || "北京",
            keyword: ""
        }
    }

    handleClick() {
        window.location.href = "/City";
    }

    handleSearch = (e) => {
        let value = this.state.keyword;

        if (value) {
            window.location.href = "/Search?keyword=" + value;
        }
    }

    handleChange = (e) => {
        this.setState({
            keyword: e.target.value.trim()
        });
    }

    handleKeyUp = (e) => {
        let code = e.keyCode;
        let value = this.state.keyword;

        if (code === 13 && value) {
            window.location.href = "/Search?keyword=" + value;
        }
    }

    render() {
        const bindEvents = {
            onChange: this.handleChange,
            onKeyUp: this.handleKeyUp
        };

        return (
            <div className="model-home">
                <div className="hold"></div>
                <div className="main">
                    <div className="header">
                        <div className="check-city" onClick={this.handleClick}>
                            <span>{this.state.city}</span>
                            <i></i>
                        </div>
                        <div className="search">
                            <div className="circle">
                                <input className="search-txt" value={this.state.keyword} placeholder="请输入关键字" type="text" {...bindEvents} />
                                <span className="search-go" onClick={this.handleSearch}></span>
                            </div>
                        </div>
                        <div className="user">
                            <a href="/User"> </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
