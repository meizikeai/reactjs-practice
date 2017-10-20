import React, { Component } from "react";
import "./block-one-title.css";

export default class BlockOneTitle extends Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        const data = this.props.data;
        const detail = data.items.length > 0 ? data.items : [];

        const createHTML = (function (e) {
            if (typeof e !== "object") {
                return "";
            }

            return e.jumpurl ?
                <a data-id={e.itemid} href={e.jumpurl}><h3>{e.name}</h3><span>更多</span></a> :
                <h3>{e.name}</h3>;
        })(detail[0]);

        return (
            <div className="block-one-title" data-id={data.templateid}>
                <div className="one-title">
                    {createHTML}
                </div>
            </div>
        );
    }
}