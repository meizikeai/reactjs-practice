import React, { Component } from "react";
import "./singlerowproduct.css";

export default class SingleRowProduct extends Component {
    constructor(props) {
        super(props);

        this.count = this.props.data.items.length;

        this.state = {
            scroll: null,
            delta: {},
            start: {
                x: 0,
                y: 0,
                first: 0,
                time: 0
            },
            screen: this.screenWidth(),
            width: this.createWidth(),
            breadth: this.createWidth() * this.count + 2,
            distance: 0, //touch事件移动的X轴距里
            startlate: 0, //touchstart开始时translateX的坐标点
            movelate: 0,  //touchmove时translateX的坐标点
            class: ""
        };
    }

    componentDidMount() {
        window.addEventListener("resize", this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleResize);
    }

    handleResize = () => {
        const screen = this.screenWidth();
        const width = this.createWidth();
        const breadth = width * this.count + 2;

        if (this.that) {
            this.setTransform(this.that, 0);
        }

        this.setState({
            screen: screen,
            breadth: breadth,
            width: width
        });
    }

    screenWidth() {
        return window.screen.width;
    }

    createWidth() {
        let breadth = this.screenWidth();
        return Math.round(breadth / 4 + (breadth / 4) / this.count);
    }

    setTransform(_node, late) {
        _node.style.transform = 'translate3d(' + late + 'px, 0px, 0px)';
    }

    handleStart = (e) => {
        e.stopPropagation();

        let that = e.currentTarget;
        let touches = e.touches[0];

        //记录下来屏变时重置~
        if (!this.that) {
            this.that = that;
        }

        //取translateX的值
        let currentnode = window.getComputedStyle(that, null);
        let currentcss = ["", "-webkit-", "-moz-", "-ms-", "-o-"];
        let currentmatrix = null;

        for (let i in currentcss) {
            let transform = currentnode.getPropertyValue(currentcss[i] + "transform");
            if (transform) {
                currentmatrix = transform;
                break;
            }
        }

        let transfrominfo = currentmatrix && currentmatrix.match(/matrix\((\d+,\s?){1,5}(-?\d+)/);

        this.setState({
            scroll: undefined,
            start: {
                x: touches.pageX,
                y: touches.pageY,
                first: touches.clientX,
                time: +new Date()
            },
            startlate: transfrominfo && (transfrominfo[2] || 0),
            class: ""
        });

        if (this.state.startlate > 0) {
            this.setTransform(that, this.state.startlate);
        }
    }

    handleMove = (e) => {
        e.stopPropagation();

        let that = e.currentTarget;
        let { scroll, startlate, distance, movelate, breadth, screen, start } = this.state;
        let touches = e.touches[0];

        if (e.touches.length > 1 || (e.scale && (e.scale !== 1))) {
            return false;
        }

        let delta = {
            x: touches.pageX - start.x,
            y: touches.pageY - start.y
        };
        start.last = e.touches[0].clientX;

        if (typeof scroll === 'undefined') {
            scroll = !!(scroll || Math.abs(delta.x) < Math.abs(delta.y));
        }

        if (!scroll) {
            //计算滑动的移动距离
            distance = start.last - start.first;
            movelate = (+startlate) + (+distance);

            if (+startlate === 0 && distance > 0) {
                return false;
            } else if (distance >= -startlate) {
                return false;
            } else if ((Math.abs(movelate) >= (breadth - screen)) && distance <= 0) {
                return false;
            }

            this.setState({
                scroll: scroll,
                distance: distance,
                movelate: movelate,
                delta: delta
            });

            this.setTransform(that, movelate);
        }
    }

    handleEnd = (e) => {
        let self = this;
        let that = e.currentTarget;
        let { start, delta, movelate, distance, breadth, screen } = this.state;

        var duration = +new Date() - start.time;
        var pass = Number(duration) < 250 && Math.abs(delta.x) > 20;

        if (!pass) {
            duration = 0;
        }

        this.setState({
            class: "single-tranfast"
        });

        if (movelate > 0 && distance > 0 && pass) {
            this.setTransform(that, 0);
        } else if (Math.abs(movelate) >= (breadth - screen) && distance <= 0 && pass) {
            this.setTransform(that, -(breadth - screen));
        } else {

            var where = 0;

            if (delta.x > 0) {
                where = movelate + duration;

                if (where > 0) {
                    where = 0;
                }
            } else {
                where = movelate - duration;

                if (where < -(breadth - screen)) {
                    where = -(breadth - screen);
                }
            }

            if (pass) {
                setTimeout(function () {
                    self.setTransform(that, where);
                }, 0);
            }
        }
    }

    render() {
        const data = this.props.data;
        const detail = data.items;

        const createHTML = detail.map((item, index) => {
            let productdetail = item.extra.productdetail;
            let prmotion = productdetail.prmotionlist.length > 0 ? productdetail.prmotionlist[0] : [];

            return <div className="pro-one" style={{ width: this.state.width }} key={index}>
                <div className="pro-img">
                    <a data-id={item.itemid} href={item.jumpurl}>
                        <img src={item.imgurl} alt={item.imgname} />
                    </a>
                    <div className={"pro-prom " + (prmotion ? "pro-none" : "")}>{prmotion ? prmotion.plabel : ""}</div>
                </div>
                <div className="pro-name">￥{productdetail.price.toFixed(2)}</div>
                <div className={"pro-price " + (item.isexclusivemobile ? "phone-enjoy" : "")}>
                    <span className="sell">￥<s>{productdetail.marketprice.toFixed(2)}</s></span>
                </div>
            </div>
        });

        const bindEvents = {
            onTouchStart: this.handleStart,
            onTouchMove: this.handleMove,
            onTouchEnd: this.handleEnd
        };

        return (
            <div className="model-single-product" data-id={data.templateid}>
                <div className="single-product">
                    <div className={"single-main " + this.state.class} {...bindEvents}>
                        <div className="single-list">
                            <div className="single-box cf" style={{ width: this.state.breadth }}>
                                {createHTML}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}