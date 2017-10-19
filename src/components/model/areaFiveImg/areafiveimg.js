import React, { Component } from "react";
import "./areafiveimg.css";

export default class AreaFiveImg extends Component {
    // constructor(props) {
    //     super(props)
    // }

    render() {
        const data = this.props.data;
        const detail = data.items;
        const createHTML = detail.map((item, index) =>
            <a data-id={item.itemid} href={item.jumpurl} key={index}>
                <div><img src={item.imgurl} alt={item.imgname} /></div>
                <p>{item.imgname}</p>
            </a>
        );

        return (
            <div className="model-area-five-img" data-id={data.templateid}>
                <div className="five-img">
                    {createHTML}
                </div>
            </div>
        );
    }
}