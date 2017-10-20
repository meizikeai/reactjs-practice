import React, { Component } from "react";
import "./model-layer.css";

export default class ModeLayer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: this.props.show,
            title: "温馨提示",
            content: "",
            time: ""
        }
        this.timer = null;

        window.AppUnitLayer = this;
    }

    show = (e) => {
        let title = e.title ? e.title : "温馨提示";
        let content = e.content ? e.content : "";
        let time = e.time ? e.time : "";

        this.setState({
            title: title,
            content: content,
            time: time,
            show: true
        }, () => {
            if (typeof time === "number") {
                this.timer = setTimeout(() => {
                    clearTimeout(this.timer);
                    this.timer = null;
                    this.setState({ show: false })
                }, time);
            }
        });
    }

    hide = () => {
        this.setState({ show: false });
    }

    componentWillUnmount = () => {
        clearTimeout(this.timer);
    }

    render() {
        const { title, content, show } = this.state;

        return <div className="model-layer" style={{ display: show ? null : "none" }}>
            <div className="layer">
                <div className="header">
                    <div className="title">{title}</div>
                    <div className="close" onClick={this.hide}></div>
                </div>
                <div className="content">{content}</div>
            </div>
            <div className="layer-scene" onClick={this.hide}></div>
        </div>
    }
}