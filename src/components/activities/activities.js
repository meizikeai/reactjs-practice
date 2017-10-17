import React, { Component } from "react";
import "whatwg-fetch";

import Header from "../unit/header/header";
import Footer from "../unit/footer/footer";

export default class Activities extends Component {
    constructor(props) {
        super(props);

        this.state = {
            info: {}
        }
    }

    componentDidMount() {
        console.log(2);
        let self = this;

        fetch("./server/activities.json")
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
            <div className="page-app-activities">
                <Header title="活动页" />
                {createTemplate}
                <Footer />
            </div>
        );
    }
}