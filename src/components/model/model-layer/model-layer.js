import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import "./model-layer.css";

class ModeLayer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: this.props.show
        }
    }

    static propTypes = {
        show: PropTypes.bool,
        title: PropTypes.string,
        content: PropTypes.string.isRequired,
        duration: PropTypes.number,
        confirm: PropTypes.bool,
        cancel: PropTypes.object,
        validate: PropTypes.object
    }

    static defaultProps = {
        show: true,
        title: "温馨提示",
        content: "",
        duration: 3000,
        confirm: false,
        cancel: { txt: "取消", fn: () => { } },
        validate: { txt: "确定", fn: () => { } }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!nextState.show) {
            ReactDOM.unmountComponentAtNode(this.props.node);
            document.body.removeChild(this.props.node);
        }

        return this.state.show !== nextState.show;
    }

    hide = (e) => {
        this.setState({ show: false });

        if (e) {
            this.props.cancel.fn();
        } else {
            this.props.validate.fn();
        }
    }

    componentWillUnmount = () => {
        // clearTimeout(this.timer);
    }

    render() {
        return <div className="model-layer" style={{ display: this.state.show ? null : "none" }}>
            <div className="layer">
                <div className="header">
                    <div className="title">{this.props.title}</div>
                </div>
                <div className="content">{this.props.content}</div>
                {this.props.confirm && <div className="footer">
                    <div className="cancel" onClick={this.hide.bind(this, false)}>{this.props.cancel.txt}</div>
                    <div className="validate" onClick={this.hide.bind(this, true)}>{this.props.validate.txt}</div>
                </div>}
                {!this.props.confirm && <div className="footer">
                    <div className="validate" onClick={this.hide.bind(this, true)}>{this.props.validate.txt}</div>
                </div>}
            </div>
            <div className="layer-back"></div>
        </div>
    }
}

export default {
    show(e) {
        let { content, duration, confirm, cancel, validate } = e;

        let createToast = (() => {
            let toast = document.createElement("div");
            toast.setAttribute("id", "toast-" + Math.floor(Math.random() * 10000));
            document.body.appendChild(toast);
            return toast;
        })();

        if (duration && typeof duration === "number") {
            setTimeout(() => {
                ReactDOM.unmountComponentAtNode(createToast);
                document.body.removeChild(createToast);
            }, duration);
        }

        ReactDOM.render(<ModeLayer content={content}
            duration={duration}
            confirm={confirm}
            cancel={cancel}
            validate={validate}
            node={createToast} />, createToast);
    }
}