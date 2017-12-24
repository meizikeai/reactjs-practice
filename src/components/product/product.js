import React, { Component } from "react";

import Header from "../model/header/header";
// import Footer from "../footer/footer";

//https://detail.m.tmall.com/item.htm?id=551881638423&sku_properties=1627207:801810489

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

        this.sku = this.getUrlParam(this.props.location.search, "id");

        // URLSearchParams - 实验性API
        // 具体见：https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams
        // 所以使用 getUrlParam 见下列方法
        // this.sku = new URLSearchParams(this.props.location.search).get('id');

        if (this.sku) {
            fetch("./server/product.json?id=" + this.sku, {
                method: "get"
            }).then(function (response) {
                return response.json();
            }).then(function (json) {
                self.setState({ info: json });
            }).catch(function (ex) {
                console.log("parsing failed", ex);
            });
        }
    }

    getUrlParam = (search, name) => {
        let regexp = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        let data = search && search.substring(1).match(regexp);
        return data && decodeURIComponent(data[2]);
    }

    createTemplate() {
        if (this.state.info.success) {
            let result = this.state.info.data;

            console.log(result);

            return ""
        } else {
            return <div className="fae">

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