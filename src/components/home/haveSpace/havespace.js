import React, { Component } from "react";
import "./havespace.css";

export default class HaveSpace extends Component {
    // constructor(props) {
    //     super(props)
    // }

    render() {
        const data = this.props.data;

        return (
            <div className="model-have-space" data-id={data.templateid}>
                <div style={{ height: data.height + "px", backgroundColor: data.bgcolor, overflow: "hidden" }}></div>
            </div>
        );
    }
}