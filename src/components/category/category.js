import React, { Component } from "react";

import Header from "../model/header/header";
import "./category.css";

export default class Category extends Component {
    constructor(props) {
        super(props);

        this.state = {
            code: "",
            headerHeight: 0, // 头部高度
            middleHeight: "auto", // 主体高度
            classHeight: "auto", // 左侧内容总高度
            brandHeight: "auto", // 右侧内容总高度
            leftHeight: 0, // 左侧可滚动高度
            rightHeight: 0, // 右侧可滚动高度
            classData: {}, // 数据 - 左侧 - 分类
            contentData: {} // 数据 - 右侧 - 具体品牌
        }

        this.classTouch = {
            startY: 0,
            scrollY: 0
        };

        this.brandTouch = {
            startY: 0,
            scrollY: 0
        };
    }

    componentDidMount() {
        console.log(2);
        const self = this;

        fetch("./server/category.json", {
            method: "get"
        }).then(function (response) {
            return response.json();
        }).then(function (json) {
            const code = json.data && json.data.catelogyList && json.data.catelogyList[0].id;

            self.getCategoryList(code);

            self.setState({
                code: code,
                classData: json
            });

            self.setState({
                classHeight: self.refs.catelogy.clientHeight,
                middleHeight: window.screen.height - self.state.headerHeight,
                leftHeight: self.refs.catelogy.clientHeight - window.screen.height + self.state.headerHeight
            });
        }).catch(function (ex) {
            console.log("parsing failed", ex);
        });

        window.addEventListener("resize", this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleResize);
    }

    getCategoryList(id) {
        let self = this;

        fetch("./server/category-list.json", {
            method: "get"
        }).then(function (response) {
            return response.json();
        }).then(function (json) {
            self.setState({
                contentData: json
            });

            self.setState({
                brandHeight: self.refs.content.clientHeight,
                rightHeight: self.refs.content.clientHeight - window.screen.height + self.state.headerHeight
            })
        }).catch(function (ex) {
            console.log("parsing failed", ex);
        });
    }

    handleResize = () => {
        var self = this;
        this.setState({
            classHeight: "auto",
            brandHeight: "auto"
        });

        setTimeout(() => {
            self.setState({
                classHeight: self.refs.catelogy.clientHeight,
                brandHeight: self.refs.content.clientHeight,
                middleHeight: window.screen.height - self.state.headerHeight,
                leftHeight: self.refs.catelogy.clientHeight - window.screen.height + self.state.headerHeight,
                rightHeight: self.refs.content.clientHeight - window.screen.height + self.state.headerHeight
            });
        }, 300)
    }

    handleClassClik(e) {
        this.setState({
            code: e.id
        });
        this.getCategoryList(e.id);
    }

    handleHeaderHeight = (e) => {
        this.setState({
            headerHeight: e
        });
    }

    // https://so.m.jd.com/so/js/category/category.js?v=jd201709071910
    // 左侧 - 分类
    handleClassStart = (e) => {
        this.classTouch.startY = e.touches[0].clientY;
        this.classTouch.scrollY = 0;
    }

    handleClassMove = (e) => {
        if (this.state.leftHeight > 0) {
            var moveY = e.touches[0].clientY;
            var clientY = moveY - this.classTouch.startY;
            var distance = 0;
            var o = this.getTranslateY(this.refs.catelogy);

            distance = o + clientY;

            if (distance > 150) {
                distance = 150
            } else {
                if (distance < (this.state.leftHeight * -1 - 150)) {
                    distance = (this.state.leftHeight * -1 - 150);
                }
            }

            this.refs.catelogy.style.transform = "translateY(" + distance + "px)";

            this.classTouch.scrollY = moveY - this.classTouch.startY;
            this.classTouch.startY = moveY;
        }
    }

    handleClassEnd = (e) => {
        this.touchTrundle(this.classTouch.scrollY, this.refs.catelogy, this.state.leftHeight, true)
    }

    // 右侧 - 具体品牌
    handleBrandStart = (e) => {
        this.brandTouch.startY = e.touches[0].clientY;
        this.brandTouch.scrollY = 0;
    }

    handleBrandMove = (e) => {
        if (this.state.rightHeight > 0) {
            var moveY = e.touches[0].clientY;
            var clientY = moveY - this.brandTouch.startY;
            var distance = 0;
            var o = this.getTranslateY(this.refs.content);

            distance = o + clientY;

            if (distance > 150) {
                distance = 150
            } else {
                if (distance < (this.state.rightHeight * -1 - 150)) {
                    distance = (this.state.rightHeight * -1 - 150);
                }
            }

            this.refs.content.style.transform = "translateY(" + distance + "px)";

            this.brandTouch.scrollY = moveY - this.brandTouch.startY;
            this.brandTouch.startY = moveY;
        }
    }

    handleBrandEnd = (e) => {
        this.touchTrundle(this.brandTouch.scrollY, this.refs.content, this.state.rightHeight, true)
    }


    touchTrundle(scrollY, that, height, lazy) {
        var range = Math.abs(scrollY);
        var distance = 0;
        if (range >= 40) {
            distance = 15;
        } else {
            if (range < 40 && range >= 25) {
                distance = 10;
            } else {
                if (range < 25 && range >= 10) {
                    distance = 5;
                } else {
                    distance = 0;
                }
            }
        } if (distance > 0) {
            if (scrollY < 0) {
                distance = distance * -1;
            }
            setTimeout(() => {
                this.touchTrundleAnime(distance, that, 0, height, lazy);
            }, 2);
        } else {
            this.touchTrundleEnd(this.getTranslateY(that), that, height);
        }
    }

    touchTrundleAnime(distance, that, min, height, lazy) {
        var trundle = min + 1;
        if (lazy) {
            // this.LazyLoad(); //未实现延迟加载
        }
        if (min < 40) {
            var range = this.getTranslateY(that) + distance;
            that.style.transform = "translateY(" + range + "px)";
            if (range <= (height * -1 - 30) || range >= 30) {
                this.touchTrundleEnd(range, that, height);
            } else {
                setTimeout(() => {
                    this.touchTrundleAnime(distance, that, trundle, height, lazy)
                }, 2);
            }
        } else {
            this.touchTrundleEnd(range, that, height)
        }
    }

    touchTrundleEnd(distance, that, height) {
        var currently = null;
        var ultimate = null;

        if (height > 0) {
            if (distance < (height * -1)) {
                currently = {
                    transform: "translateY(" + (height * -1) + "px)",
                    transition: "0.2s ease 0s"
                };
                ultimate = {
                    transform: "translateY(" + (height * -1) + "px)",
                    transition: ""
                }
            } else {
                if (distance > 0) {
                    currently = {
                        transform: "translateY(0px)",
                        transition: "0.2s ease 0s"
                    };
                    ultimate = {
                        transform: "translateY(0px)",
                        transition: ""
                    }
                }
            }
        }

        if (distance !== 0) {
            if (currently) {
                that.style.transform = currently.transform;
                that.style.transition = currently.transition;
            }
            setTimeout(() => {
                if (ultimate) {
                    that.style.transform = ultimate.transform;
                    that.style.transition = ultimate.transition;
                }
            }, 200);

            return true;
        } else {
            that.style.transform = "translateY(0px)";
            return false;
        }
    }

    getTranslateY(that) {
        var value = that.style.transform;
        if (value === "") {
            value = 0;
        } else {
            value = value.replace("translateY(", "").replace(")", "");
            value = parseInt(value, 10);
        }
        if (!value) {
            value = 0;
        }

        return value;
    }

    createTab() {
        if (this.state.classData.success) {
            const result = this.state.classData.data;
            const catelogy = result.catelogyList;

            const bindClassTrundle = {
                onTouchStart: this.handleClassStart,
                onTouchMove: this.handleClassMove,
                onTouchEnd: this.handleClassEnd
            };

            return <div className="category-class" style={{ height: this.state.middleHeight }}>
                <ul className="catelogy"
                    ref="catelogy"
                    style={{ height: this.state.classHeight }}
                    {...bindClassTrundle}>
                    {
                        catelogy.map((e, k) => {
                            return <li
                                className={e.id === this.state.code ? "cursor" : ""}
                                data-id={e.id}
                                onClick={this.handleClassClik.bind(this, e)}
                                key={k}><span>{e.name}</span>
                            </li>
                        })
                    }
                </ul>
            </div>
        }
    }

    createContent() {
        if (this.state.contentData.success) {
            const result = this.state.contentData.data;
            const shopList = result.shopList;
            const classList = result.classList;

            const bindBrandTrundle = {
                onTouchStart: this.handleBrandStart,
                onTouchMove: this.handleBrandMove,
                onTouchEnd: this.handleBrandEnd
            };

            let shopHTML = shopList.map((e, k) => {
                return <div className="promotion" key={k}>
                    <a data-id={e.catelogyId} href={e.catelogyUrl}>
                        <img src={e.catelogyImg} alt={e.catelogyTitle} />
                    </a>
                </div>;
            });

            let classHTML = classList.map((e, k) => {
                let catelogyList = e.catelogyList;

                let brandsHTML = catelogyList.map((o, i) => {
                    return <li key={i}>
                        <a data-id={o.id} href={"ProductList?condition=" + o.id + "&title=" + o.searchKey}>
                            <p><img src={o.icon} alt={o.name} /></p>
                            <span>{o.name}</span>
                        </a>
                    </li>;
                });

                return <div className="everyone" key={k}>
                    <h3>{e.name}</h3>
                    <ul className="brands">
                        {brandsHTML}
                    </ul>
                </div>;
            });

            return <div className="category-brand" style={{ height: this.state.middleHeight }}>
                <div className="content" ref="content" style={{ height: this.state.brandHeight }} {...bindBrandTrundle}>
                    {shopHTML}
                    {classHTML}
                </div>
            </div>
        }
    }

    render() {
        const createTab = this.createTab();
        const createContent = this.createContent();

        return (
            <div className="page-app-category">
                <Header title="分类" handleHeaderHeight={this.handleHeaderHeight} />
                <div className="app-category-content">
                    <div className="category">
                        {createTab}
                        {createContent}
                    </div>
                </div>
            </div>
        );
    }
}