import React, { Component } from "react";
import "./threeimageleftbig.css";

export default class ThreeImageLeftBig extends Component {
    // constructor(props) {
    //     super(props)
    // }

    createHTML(detail) {
        const createHTML = detail.map((item, index) => {
            if (index === 0) {
                return <div className="picture-1" key={index}>
                    <a data-id={item.itemid} href={item.jumpurl}>
                        <img src={item.imgurl} alt={item.imgname} />
                    </a>
                </div>
            } else {
                return <div className={"picture-2-" + index} key={index}>
                    <a data-id={item.itemid} href={item.jumpurl}>
                        <img src={item.imgurl} alt={item.imgname} />
                    </a>
                </div>
            }
        });

        return <div className="picture">{createHTML[0]}<div className="picture-2">{createHTML[1]}{createHTML[2]}</div></div>;
    }

    render() {
        const data = this.props.data;
        const detail = data.items;
        const createHTML = this.createHTML(detail);

        return (
            <div className="model-three-image-left-big" data-id={data.templateid}>
                {createHTML}
            </div>
        );
    }
}