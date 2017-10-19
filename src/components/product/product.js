import React, { Component } from "react";
import "whatwg-fetch";

import Header from "../model/header/header";
// import Footer from "../footer/footer";

//https://detail.m.tmall.com/item.htm?id=551881638423&sku_properties=1627207:801810489

export default class Product extends Component {
    constructor(props) {
        super(props);

        this.state = {
            info: {}
        }

        this.id = new URLSearchParams(this.props.location.search).get('id');
    }

    componentDidMount() {
        console.log(2);
        let self = this;

        if (this.id) {
            fetch("./server/product.json")
                .then(function (response) {
                    return response.json();
                }).then(function (json) {
                    self.setState({ info: json });
                }).catch(function (ex) {
                    console.log("parsing failed", ex);
                });
        }
    }

    createTemplate() {
        if (this.state.info.success) {
            let result = this.state.info.data;

            console.log(result);

            return ""
        } else {
            return <div className>

            </div>
        }
    }

    render() {
        const createTemplate = this.createTemplate();

        return (
            <div className="page-app-product-detail">
                <Header title="商品详情" />
                {createTemplate}
            </div>
        );
    }
}