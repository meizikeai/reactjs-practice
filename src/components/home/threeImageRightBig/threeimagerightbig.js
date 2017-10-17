import React, { Component } from "react";
import "./threeimagerightbig.css";

export default class ThreeImageRightBig extends Component {
    // constructor(props) {
    //     super(props)
    // }

    createHTML(detail) {
        const createHTML = detail.map((item, index) => {
            if (index === 2) {
                return <div className="picture-2" key={index}>
                    <a data-id={item.itemid} href={item.jumpurl}>
                        <img src={item.imgurl} alt={item.imgname} />
                    </a>
                </div>
            } else {
                return <div className={"picture-1-" + (index + 1)} key={index}>
                    <a data-id={item.itemid} href={item.jumpurl}>
                        <img src={item.imgurl} alt={item.imgname} />
                    </a>
                </div>
            }
        });

        return <div className="picture"><div className="picture-1">{createHTML[0]}{createHTML[1]}</div>{createHTML[2]}</div>;
    }

    render() {
        const data = this.props.data;
        const detail = data.items;
        const createHTML = this.createHTML(detail);

        return (
            <div className="model-three-image-right-big" data-id={data.templateid}>
                {createHTML}
            </div>
        );
    }
}