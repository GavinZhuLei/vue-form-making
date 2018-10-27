## 图片上传

**图片上传到七牛，需要配置七牛访问图片域名和七牛上传token**

![](https://user-gold-cdn.xitu.io/2018/10/27/166b5aa13b248ca0?w=318&h=178&f=png&s=11373)

代码实例：
```html
<fm-generate-form :remote="remoteFuncs" ></fm-generate-form>
```

```javascript
new Vue({
	data () {
	 	return {
			remoteFuncs: {
				funcGetToken (resolve) {
					// todo: 获取七牛token
					resolve(uptoken)
				}
			  }
		}
	}
})
```