import React, { Component } from "react";

import "whatwg-fetch";
import Position from "../model/model-position/model-position";

import Header from "../model/header/header";
import "./city.css";

export default class City extends Component {
    constructor(props) {
        super(props);

        this.state = {
            info: {},
            city: ""
        }
    }

    componentDidMount() {
        let self = this;

        fetch("./server/city.json", {
            method: "get"
        }).then(function (response) {
            return response.json();
        }).then(function (json) {
            self.setState({ info: json });
        }).catch(function (ex) {
            console.log("parsing failed", ex);
        });

        Position.getPosition((val) => {
            this.setState({ city: val });
        });
    }

    createCity() {
        if (this.state.info.success) {
            let result = this.state.info.cities;
            return result.map((item, index) =>
                <div className="views" key={index} onClick={this.handleCity.bind(this, item)}>{item.name}</div>
            );
        }
    }

    handleCity(item) {
        localStorage.city = item.name;
        setTimeout(() => window.history.back(), 300);
    }

    render() {
        const createCity = this.createCity();

        return (
            <div className="page-app-city">
                <Header title={"选择城市"} />
                <div className="app-city">
                    <div className="check"><span>{this.state.city}</span>GPS定位</div>
                    <h3 className="hot">热门城市</h3>
                    <div className="list cf">
                        {createCity}
                    </div>
                </div>
            </div>
        );
    }
}