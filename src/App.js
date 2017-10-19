import React, { Component } from "react";
import "whatwg-fetch";

import HomeHeader from "./components/model/head/head";
import Footer from "./components/model/footer/footer";
import CarouselFigure from "./components/model/carouselFigure/carouselfigure";
import AreaFiveImg from "./components/model/areaFiveImg/areafiveimg";
import HaveSpace from "./components/model/haveSpace/havespace";
import OneImage from "./components/model/oneImage/oneimage";
import OneTitle from "./components/model/oneTitle/onetitle";
import TwoImage from "./components/model/twoImage/twoimage";
import ThreeImageLeftBig from "./components/model/threeImageLeftBig/threeimageleftbig";
import ThreeImageRightBig from "./components/model/threeImageRightBig/threeimagerightbig";
import ThreeImageAbreast from "./components/model/threeImageAbreast/threeimageabreast";
import DoubleProduct from "./components/model/doubleProduct/doubleproduct";
import SingleRowProduct from "./components/model/singleRowProduct/singlerowproduct";
import Download from "./components/model/download/download";

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            info: {}
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

        fetch("./server/home.json")
            .then(function (response) {
                return response.json();
            }).then(function (json) {
                self.setState({ info: json });
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
                        return <CarouselFigure data={service} key={index} />;
                    case "FuncAreaFiveImg":
                        return <AreaFiveImg data={service} key={index} />;
                    case "HaveSpace":
                        return <HaveSpace data={service} key={index} />;
                    case "OneTitle":
                        return <OneTitle data={service} key={index} />;
                    case "OneImage":
                        return <OneImage data={service} key={index} />;
                    case "TwoImage":
                        return <TwoImage data={service} key={index} />;
                    case "ThreeImageLeftBig":
                        return <ThreeImageLeftBig data={service} key={index} />;
                    case "ThreeImageRightBig":
                        return <ThreeImageRightBig data={service} key={index} />;
                    case "ThreeImageAbreast":
                        return <ThreeImageAbreast data={service} key={index} />;
                    case "DoubleProduct":
                        return <DoubleProduct data={service} key={index} />;
                    case "SingleRowProduct":
                        return <SingleRowProduct data={service} key={index} />;
                    default:
                        return <div style={{ textAlign: "center", paddingTop: "25px" }}>不好啦，漏掉模块啦~</div>;
                }
            });
        }
    }

    render() {
        const createTemplate = this.createTemplate();

        return (
            <div className="page-app-index">
                <HomeHeader />
                {createTemplate}
                <Footer path={this.props.location.pathname} />
                <Download />
            </div>
        );
    }
}