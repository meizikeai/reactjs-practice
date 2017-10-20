尝试使用reactjs来做一下页面展示，感受下日新月异的技术更新！业余时间写，深入不够~

## 依赖见package.json

如果想看相关依赖，请看 package.json 文件，如果想跑起来再继续往下看.

### `npm install`

拉下node_modules的文件.

### `npm start`

在开发模式下运行应用程序.<br>
在浏览器里打开 [http://localhost:3000](http://localhost:3000) 就可以看到相关.

如果编辑相关文件，页面将重新进行渲染.<br>
可以在控制台看到相关警告、错误提示.

### `npm run build`

生成正式的 `build` 文件.<br>
如果想要看在生产模式下的最佳优化及性能，建议跑来看下~


## 关于数据

一切的数据都是假的，都是想出来的~


## 页面入口 - 每个页面总要有入口的~

1、活动页
/activities?pageid=30002232

2、列表页
/productlist?condition=10000655

3、搜索页
/search?keyword=love

4、详情页
/product?id=20-961-1818

...

## 事件绑定方式
```js
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
```

```js
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
```

```js
_handleClick = (e) => {
    console.log(this);
}
render() {
    return (
        <div>
            <h1 onClick={this._handleClick}>点击</h1>
        </div>
    );
}
```

## 插件

例举一些想用而没用的

### `没有使用`

* [flux](https://github.com/facebook/flux)
* [PureRenderMixin](https://reactjs.org/docs/pure-render-mixin.html)

### `路由`

* [react-router](https://reacttraining.com/react-router/web/api/Route)

### `弹窗 - 下面的组件都没用 - 写了一个简单的`

* [react-modal](https://github.com/reactjs/react-modal)
* 第三方-[react-modal-dialog](https://github.com/qimingweng/react-modal-dialog)
* 第三方-[react-popup](https://github.com/minutemailer/react-popup)