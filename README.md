# com-axios
通用请求组件，兼容前端和node端请求

## 使用示例
```

import comAxios from '@ali/com-axios';
import apiMap from './apis';

	/**
 * api(必填项): 向后端请求的url 的一种映射，详见demo中的apis.js文件
 * data(非必填): 请求参数
 * method(非必填): 请求方式，默认为 get
 * apiMap(非必填): url映射 键值对
 * baseURL(非必填): axios 默认网址，当api为 绝对地址('http://....')时，会覆盖baseURL，不是时baseURL会添加在api前面
 */
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

```

## demo 示例

```
// 启动 demo 前端示例
npm start

// 启动 demo 后端服务
npm run server

```