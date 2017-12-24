import React, { Component } from "react";

import Header from "../model/header/header";
import Footer from "../model/footer/footer";
import "./search.css";

export default class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            info: {},
            initcode: 1,
            every: [
                { name: "默认", code: 1 },
                { name: "销量", code: 2 },
                { name: "价格", code: 3 },
                { name: "筛选", code: 4 }
            ],
            check: [
                { type: "category", category: "", name: "", count: "" },
                { type: "brand", brand: "", name: "", count: "" },
                { type: "price", price: "", name: "", count: "" }
            ],
            filter: "app-filter",
            layer: "app-layer"
        }
    }

    componentDidMount() {
        this.handleFetch();
    }

    getUrlParam = (search, name) => {
        let regexp = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        let data = search && search.substring(1).match(regexp);
        return data && decodeURIComponent(data[2]);
    }

    handleFetch(e) {
        let self = this;
        let code = e ? e.code : this.state.initcode;
        let search = e ? e.search : "";

        fetch("./server/search-" + code + ".json?code=" + code + search, {
            method: "get"
        }).then(function (response) {
            return response.json();
        }).then(function (json) {
            self.setState({ info: json });
        }).catch(function (ex) {
            console.log("parsing failed", ex);
        });
    }

    handleLayer = (e) => {
        this.setState({
            filter: "app-filter",
            layer: "app-layer"
        });
    }

    handleEvery(e) {
        this.setState({
            initcode: e.code
        });

        if (e.code !== 4) {
            this.handleFetch(e);
        } else {
            this.setState({
                filter: "app-filter app-filter-open",
                layer: "app-layer app-layer-open"
            });
        }
    }

    createEvery() {
        let every = this.state.every;
        let result = every.map((item, index) => {
            return <div className="every" key={index} onClick={this.handleEvery.bind(this, item)}>
                <div className={"key" + (index === 0 ? " first" : "") + (index + 1 === this.state.initcode ? " current" : "")}>
                    <span>{item.name}</span>
                </div>
            </div>
        });

        return <div className="app-search">{result}</div>;
    }

    handleCategory(item, k, e) {
        let check = this.state.check;

        for (let i = 0; i < check.length; i++) {
            if (check[i].type === item.type) {
                check[i][item.type] = item.value;
                check[i].name = item.name;
                check[i].count = k;

                this.setState({
                    check: check
                });
            }
        }
    }

    handleReset = (e) => {
        this.setState({
            check: [
                { type: "category", category: "", name: "", count: "" },
                { type: "brand", brand: "", name: "", count: "" },
                { type: "price", price: "", name: "", count: "" }
            ]
        });
    }

    handleEnter = (e) => {
        let check = this.state.check;
        let search = "&";

        check.forEach((item) => {
            search += item.type + "=" + item[item.type] + "&";
        });

        search = search.substring(0, search.length - 1);

        this.handleFetch({
            code: 4,
            search: search
        });

        this.setState({
            filter: "app-filter",
            layer: "app-layer"
        });
    }

    createTemplate() {
        if (this.state.info.success) {
            let data = this.state.info.data;
            let productlist = data.productlist;
            let result = productlist.map((item, index) => {
                return <li className={(index + 1) % 2 ? "" : "pro-line"} key={index}>
                    <div className="pro-one">
                        <div className="pro-img">
                            <a data-id={item.itemcode} href={item.jumpurl}>
                                <img src={item.image} alt={item.name} />
                            </a>
                        </div>
                        <div className="pro-name">
                            {item.ismiaowgoods ? <i></i> : ""}{item.name}
                        </div>
                        <div className={"pro-price " + (item.isexclusivemobile ? "phone-enjoy" : "")}>
                            <span className="sell">￥<b>{item.ytprice.toFixed(2)}</b></span>
                            <span className="market">￥<s>{item.price.toFixed(2)}</s></span>
                        </div>
                        <div className={"pro-prom " + (item.promotionlist.length > 0 ? "" : "pro-none")}>
                            {item.promotionlist.length ? item.promotionlist[0].plabel : ""}
                        </div>
                    </div>
                </li>
            });

            return <div className="app-search-list">
                <ul className="search-double">{result}</ul>
            </div>
        }
    }

    createFilter() {
        if (this.state.info.success) {
            let data = this.state.info.data;
            let filter = data.filter;

            let result = filter.map((item, index) => {
                let items = item.items;
                let html = items.map((value, count) => {
                    return <li className={this.state.check[index]["count"] === count ? "check" : ""} key={count} value={value.value} onClick={this.handleCategory.bind(this, value, count)}>
                        {value.name}
                    </li>
                });

                return <div className="result" key={index}>
                    <h3 className="category">
                        <span>{item.title}：</span><b>{this.state.check[index]["name"]}</b><em className="close"></em>
                    </h3>
                    <ul className="screen cf">
                        {html}
                    </ul>
                </div>
            });

            return <div className={this.state.filter}>
                <div className="filter-box">
                    <div className="filter-header">请选择</div>
                    <div className="filter-result">
                        {result}
                    </div>
                    <div className="filter-footer">
                        <div className="filter-reset" onClick={this.handleReset}>重置</div>
                        <div className="filter-enter" onClick={this.handleEnter}>确定</div>
                    </div>
                </div>
            </div>
        }
    }

    render() {
        const createEvery = this.createEvery();
        const createTemplate = this.createTemplate();
        const createFilter = this.createFilter();
        const keyword = '"' + this.getUrlParam(this.props.location.search, "keyword") + '"';

        return (
            <div className="page-app-search">
                <Header title={keyword + "的搜索结果"} />
                {createEvery}
                {createTemplate}
                {createFilter}
                <div className={this.state.layer} onClick={this.handleLayer}></div>
                <Footer />
            </div >
        );
    }
}