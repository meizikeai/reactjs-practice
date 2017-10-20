import React, { Component } from "react";

export default class HaveSpace extends Component {
    // constructor(props) {
    //     super(props)
    // }

    render() {
        const data = this.props.data;

        return (
            <div className="block-have-space" data-id={data.templateid}>
                <div style={{ height: data.height + "px", backgroundColor: data.bgcolor, overflow: "hidden" }}></div>
            </div>
        );
    }
}