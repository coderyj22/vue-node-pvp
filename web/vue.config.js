module.exports = {
	lintOnSave: true,
	css: {
		loaderOptions: {
			postcss: {
				plugins: [
					require('postcss-pxtorem')({
						rootValue: 37.5, // 换算的基数
						selectorBlackList: [], // 忽略转换正则匹配项
						propList: ['*'],
					}),
				]
			}
		}
	},
	devServer: {
		proxy: {
			'/api': {
				target: "http://localhost:3000/web/api",
				changeOrigin: true,
				pathRewrite: {
					'^/api': ''
				}
			}
		}
	}
}
