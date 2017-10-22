import React, { Component } from "react";
import "whatwg-fetch";

import Footer from "./components/model/footer/footer";
import ModelEmpty from "./components/model/model-empty/model-empty";
import ModelLayer from "./components/model/model-layer/model-layer";
import ModelDownload from "./components/model/model-download/model-download";

import BlockHead from "./components/index/block-head/block-head";

import BlockCarouselFigure from "./components/index/block-carousel-figure/block-carousel-figure";
import BlockAreaFiveIcon from "./components/index/block-area-five-icon/block-area-five-icon";
import BlockHaveSpace from "./components/index/block-have-space/block-have-space";
import BlockOneTitle from "./components/index/block-one-title/block-one-title";
import BlockOneImage from "./components/index/block-one-image/block-one-image";
import BlockTwoImage from "./components/index/block-two-image/block-two-image";
import BlockThreeImageLeftBig from "./components/index/block-three-image-left-big/block-three-image-left-big";
import BlockThreeImageRightBig from "./components/index/block-three-image-right-big/block-three-image-right-big";
import BlockThreeImageAbreast from "./components/index/block-three-image-abreast/block-three-image-abreast";
import BlockDoubleProduct from "./components/index/block-double-product/block-double-product";
import BlockSingleRowProduct from "./components/index/block-single-row-product/block-single-row-product";

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            info: {},
            bgcolor: "#fee"
        }
    }

    getInitalState() {
        console.log(0);
    }

    componentWillMount() {
        console.log(1);
    }

    componentDidMount() {
        console.log(2);
        let self = this;

        fetch("./server/home.json", {
            method: "get"
        }).then(function (response) {
            return response.json();
        }).then(function (json) {
            self.setState({
                info: json,
                bgcolor: json.data.bgcolor
            });
        }).catch(function (ex) {
            console.log("parsing failed", ex);
        });
    }

    componentWillUpdate() {
        console.log(3)
    }

    componentDidUpdate() {
        console.log(4)
    }

    componentWillUnmount() {
        console.log(5)
    }

    //根据数据循环创建相应的模块
    createTemplate() {
        if (this.state.info.success) {
            let result = this.state.info.data;
            let templateList = result.templatelist;

            return templateList.map((service, index) => {
                switch (service.templatetype) {
                    case "CarouselFigure":
                        return <BlockCarouselFigure data={service} key={index} />;
                    case "FuncAreaFiveImg":
                        return <BlockAreaFiveIcon data={service} key={index} />;
                    case "HaveSpace":
                        return <BlockHaveSpace data={service} key={index} />;
                    case "OneTitle":
                        return <BlockOneTitle data={service} key={index} />;
                    case "OneImage":
                        return <BlockOneImage data={service} key={index} />;
                    case "TwoImage":
                        return <BlockTwoImage data={service} key={index} />;
                    case "ThreeImageLeftBig":
                        return <BlockThreeImageLeftBig data={service} key={index} />;
                    case "ThreeImageRightBig":
                        return <BlockThreeImageRightBig data={service} key={index} />;
                    case "ThreeImageAbreast":
                        return <BlockThreeImageAbreast data={service} key={index} />;
                    case "DoubleProduct":
                        return <BlockDoubleProduct data={service} key={index} />;
                    case "SingleRowProduct":
                        return <BlockSingleRowProduct data={service} key={index} />;
                    default:
                        return <ModelEmpty key={index} />;
                }
            });
        }
    }

    render() {
        const createTemplate = this.createTemplate();

        return (
            <div className="page-app-index">
                <BlockHead />
                <div className="block-full" style={{ backgroundColor: this.state.bgcolor }}>
                    {createTemplate}
                </div>
                <Footer path={this.props.location.pathname} />
                <ModelDownload />
                <ModelLayer />
            </div>
        );
    }
}