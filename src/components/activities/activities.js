import React, { Component } from "react";
import "whatwg-fetch";

import Header from "../model/header/header";
import Footer from "../model/footer/footer";
import ModelEmpty from "../model/model-empty/model-empty";

import BlockOnePicture from "./block-one-picture/block-one-picture";
import BlockTwoPicture from "./block-two-picture/block-two-picture";
import BlockProduct from "./block-product/block-product";
import BlockHotProduct from "./block-hot-product/block-hot-product";

export default class Activities extends Component {
    constructor(props) {
        super(props);

        this.state = {
            info: {},
            pageTitle: "",
            bgcolor: "#fff",
        }

        // 简单示意下，这里写最简的三个模块，一图、两图、产品列表~
        // 可以根据需求开发新模块~
    }

    componentDidMount() {
        console.log(2);
        let self = this;

        // URLSearchParams - 实验性API
        // 具体见：https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams
        // 所以使用 getUrlParam 见下列方法
        // let pageid = new URLSearchParams(this.props.location.search).get('pageid');

        let pageid = this.getUrlParam(this.props.location.search, "pageid");

        fetch("./server/activities.json?pageid=" + pageid, {
            method: "get"
        }).then(function (response) {
            return response.json();
        }).then(function (json) {
            self.setState({
                info: json,
                pageTitle: json.data.pageTitle,
                bgcolor: json.data.bgcolor
            });

        }).catch(function (ex) {
            console.log("parsing failed", ex);
        });
    }

    getUrlParam = (search, name) => {
        let regexp = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        let data = search && search.substring(1).match(regexp);
        return data && decodeURIComponent(data[2]);
    }

    createTemplate() {
        if (this.state.info.success) {
            let result = this.state.info.data;
            let template = result.template;

            return template.map((e, k) => {
                switch (e.templatetype) {
                    case "OneImage":
                        return <BlockOnePicture data={e} key={k} />;
                    case "TwoImage":
                        return <BlockTwoPicture data={e} key={k} />;
                    case "Product":
                        return <BlockProduct data={e} key={k} />;
                    case "hotProduct":
                        return <BlockHotProduct data={e} bgcolor={this.state.bgcolor} key={k} />;
                    default:
                        return <ModelEmpty key={k} />;
                }
            });
        }
    }

    render() {
        const createTemplate = this.createTemplate();

        return (
            <div className="page-app-activities">
                <Header title={this.state.pageTitle} />
                <div className="block-full" style={{ backgroundColor: this.state.bgcolor }}>
                    {createTemplate}
                </div>
                <Footer />
            </div>
        );
    }
}