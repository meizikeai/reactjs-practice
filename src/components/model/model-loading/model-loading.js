import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import "./model-loading.css";

class ModelLoading extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    static propTypes = {
        callback: PropTypes.func,
        content: PropTypes.string
    }

    static defaultProps = {
        callback: null,
        content: "正在加载中..."
    }

    componentWillUnmount = () => {
        if (typeof this.props.callback === 'function') {
            setTimeout(this.props.callback, 10);
        }
    }

    render() {
        return <div className="model-loading">
            <div className="loading">
                <p>{this.props.content}</p>
            </div>
            <div className="loading-back"></div>
        </div>;
    }
}

export const StartLoading = (e) => {
    let { content, duration, callback } = e;

    let createLoading = (() => {
        let loading = document.createElement("div");
        loading.setAttribute("id", "loading-" + Math.floor(Math.random() * 10000));
        document.body.appendChild(loading);
        return loading;
    })();

    setTimeout(() => {
        ReactDOM.unmountComponentAtNode(createLoading);
        document.body.removeChild(createLoading);
    }, duration || 1000);

    ReactDOM.render(<ModelLoading content={content}
        duration={duration}
        callback={callback}
        node={createLoading} />, createLoading);
}