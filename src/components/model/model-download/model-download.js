import React, { Component } from "react";
import ModeLayer from "../model-layer/model-layer";
import "./model-download.css";

export default class ModelDownload extends Component {
    constructor(props) {
        super(props);

        this.state = {
            state: false
        };
    }

    handleClose = (e) => {
        this.setState({
            state: true
        });
    }

    handleOpenApp = (e) => {
        let iframe = document.createElement('iframe');

        iframe.src = "mobile://Page?id=Home"; //具体参考调用协议
        iframe.style.display = 'none';
        document.body.appendChild(iframe);

        setTimeout(function () {
            document.body.removeChild(iframe);
            (function () {
                ModeLayer.show({
                    content: "协议不可能是“mobile://Page?id=Home”，请修改后再试一下~"
                })
            })()
        }, 600);
    }

    render() {
        return <div className="model-download" style={{ display: this.state.state ? "none" : null }} >
            <div className="download">
                <div className="close" onClick={this.handleClose}></div>
                <div className="other">
                    <i></i>
                    <div>
                        <strong>打开手机官方App</strong>
                        <p>随时随地 想买就买</p>
                    </div>
                    <span className="open" onClick={this.handleOpenApp}>立即打开</span>
                </div>
            </div>
        </div>
    }
}


