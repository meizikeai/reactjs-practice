##关于APP
业务时间随便尝试用Reactjs搞的，无深入了解~~


##关于数据
一切的数据都是假的，都是想出来的~~


##未使用的插件
1、Flux
2、react-addons-pure-render-mixin


##页面入口 - 每个页面总要有入口的~
1、活动页
/Activities?pageid=30002232

2、列表页
/ProductList?condition=10000655

3、搜索页
/SearchList?keyword=love

4、详情页
/ProductDetail?code=20-961-1818


##事件 - 了解绑定方式
#第一种
_handleClick(e) {
    console.log(this);
}
render() {
    return (
        <div>
            <h1 onClick={this._handleClick.bind(this)}>点击</h1>
        </div>
    );
}

#第二种
constructor(props) {
    super(props);
    this._handleClick = this._handleClick.bind(this)
}
_handleClick(e) {
    console.log(this);
}
render() {
    return (
        <div>
            <h1 onClick={this._handleClick}>点击</h1>
        </div>
    );
}

#第三种
_handleClick = (e) => {
    // 使用箭头函数(arrow function)
    console.log(this);
}
render() {
    return (
        <div>
            <h1 onClick={this._handleClick}>点击</h1>
        </div>
    );
}


##路由
https://reacttraining.com/react-router/web/api/Route


##弹窗 - 下面的组件都没用 - 只想简单的写一个
1、react-modal（官方的组件） https://github.com/reactjs/react-modal
2、react-modal-dialog（第三方） https://github.com/qimingweng/react-modal-dialog
3、react-popup（第三方）https://github.com/minutemailer/react-popup