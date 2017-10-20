import React, { Component } from "react";
import "./block-three-image-abreast.css"

export default class BlockThreeImageAbreast extends Component {
    // constructor(props) {
    //     super(props)
    // }

    render() {
        const data = this.props.data;
        const detail = data.items;

        const createHTML = detail.map((item, index) => {
            return <div className={"picture-" + (index + 1)} key={index}>
                <a data-id={item.itemid} href={item.jumpurl}>
                    <img src={item.imgurl} alt={item.imgname} />
                </a>
            </div>
        });

        return (
            <div className="block-three-image-abreast" data-id={data.templateid}>
                <div className="picture">
                    {createHTML}
                </div>
            </div>
        );
    }
}