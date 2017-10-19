import React, { Component } from "react";
import "whatwg-fetch";

import Header from "../model/header/header";
// import Footer from "../model/footer/footer";

export default class Checkout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            info: {}
        }
    }

    componentDidMount() {
        console.log(2);
        let self = this;

        fetch("./server/checkout.json")
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
            <div className="page-app-checkout">
                <Header title="结算页" />
                {createTemplate}
            </div>
        );
    }
}