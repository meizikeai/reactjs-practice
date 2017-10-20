import React, { Component } from "react";
import "./block-area-five-icon.css";

export default class BlockAreaFiveIcon extends Component {
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
            <div className="block-area-five-icon" data-id={data.templateid}>
                <div className="five-img">
                    {createHTML}
                </div>
            </div>
        );
    }
}