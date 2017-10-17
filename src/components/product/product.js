import React, { Component } from "react";
import "whatwg-fetch";

import Header from "../unit/header/header";
// import Footer from "../footer/footer";

export default class Product extends Component {
    constructor(props) {
        super(props);

        this.state = {
            info: {}
        }
    }

    componentDidMount() {
        console.log(2);
        let self = this;

        fetch("./server/product.json")
            .then(function (response) {
                return response.json();
            }).then(function (json) {
                self.setState({ info: json });
            }).catch(function (ex) {
                console.log("parsing failed", ex);
            });
    }

    createTemplate() {
        if (this.state.info.success) {
            let result = this.state.info.data;

            console.log(result);

            return ""
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