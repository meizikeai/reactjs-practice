import React, { Component } from "react";
import "./oneimage.css";

export default class OneImage extends Component {
    // constructor(props) {
    //     super(props)
    // }

    render() {
        const data = this.props.data;
        const detail = data.items.length > 0 ? data.items : [];

        const createHTML = (function (e) {
            if (typeof e !== "object") {
                return "";
            }
            return e.jumpurl ?
                <a data-id={e.itemid} href={e.jumpurl}><img src={e.imgurl} alt={e.imgname} /></a> :
                <img src={e.imgurl} alt={e.imgname} />;
        })(detail[0]);

        return (
            <div className="model-one-image" data-id={data.templateid}>
                {createHTML}
            </div>
        );
    }
}