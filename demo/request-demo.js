import React from 'react';
import comAxios from '../src/index';
import apiMap from './apis';

export default class RequestDemo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			res: '我是默认值'
		};
	}

	/**
 * api(必填项): 向后端请求的url 的一种映射，详见demo中的apis.js文件
 * data(非必填): 请求参数
 * method(非必填): 请求方式，默认为 get
 * apiMap(非必填): url映射 键值对
 * baseURL(非必填): comAxios 默认网址，当api为 绝对地址('http://....')时，会覆盖baseURL，不是时baseURL会添加在api前面
 */
	request() {
		comAxios({
			api: 'test',
			method: 'get',
			apiMap,
			baseURL: 'http://localhost:9000' // 此时baseURL没有用
		}).then((res) => {
      alert(`成功返回请求值(${res})`);
      
      console.log(res);

      this.setState({
        res
      })
		});
	}

	render() {
		return (
			<div>
				<p> {(this.state.res)} </p>
				<button onClick={this.request.bind(this)}>Demo 测试</button>
			</div>
		);
	}
}
