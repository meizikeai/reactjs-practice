import React, { Component } from 'react';
// import PureRenderMixin from 'react-addons-pure-render-mixin';
import ReactSwipe from 'react-swipe';
import './carouselfigure.css';

export default class CarouselFigure extends Component {
    constructor(props) {
        super(props);
        // this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            currentIndex: 0
        }
    }

    render() {
        const config = {
            auto: 4000,
            speed: 600,
            callback: index => {
                this.setState({
                    currentIndex: index
                })
            }
        };

        const data = this.props.data;
        const detail = data.items;

        const createCarousel = detail.map((item, index) =>
            <div className="category" key={index}>
                <a href={item.jumpurl}>
                    <img src={item.imgurl} alt={item.imgname} />
                </a>
            </div>
        );

        const createMarker = detail.map((item, index) =>
            <span className={this.state.currentIndex === index ? "pointer" : "default"} key={index}></span>
        );

        return (
            <div className="app-carousel-figure" data-id={data.templateid}>
                <ReactSwipe className="carousel" swipeOptions={config}>
                    {createCarousel}
                </ReactSwipe>
                <div className="marker">
                    {createMarker}
                </div>
            </div>
        );
    }
}
