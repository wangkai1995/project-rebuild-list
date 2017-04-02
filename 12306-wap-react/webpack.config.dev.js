var path = require('path');
var fs = require('fs');
var SpritesmithPlugin = require('webpack-spritesmith');
var webpack = require('webpack');

/*
npm uninstall webpack --save-dev

npm install webpack@2.1.0-beta.22 --save-dev

*/

module.exports={
	devtool:'cheap-module-eval-source-map',
	//入口文件
	entry:{
		app:[
			'webpack-hot-middleware/client',
			'./src/app',
		],
		vendors:['react','react-dom','react-router'],
	},
	//输出文件
	output:{
		//文件命名
		filename:'[name].js',
		//分片文件 用来异步加载
		chunkFilename: '[name].[chunkhash].js',
		//输出目录
		publicPath:'/static/',
	},
	//监控文件
	module:{
		loaders:[{
			//监听jsx
			test: /\.jsx?$/,
			include:[
				path.resolve(__dirname,'src'),
			],
			loaders:['react-hot','babel'],
		}
		,{
			//开启css module
			test: /\.scss$/,
			// exclude: path.resolve(__dirname,'src/styles/sprite.scss'),
			include:[
				path.resolve(__dirname,'src'),
			],
			loader: 'style!css?modules&localIdentName=[name]__[local]__[hash:base64:5]!sass?sourceMap=true!',
		},
		{
			//开启css module-针对 icon
			test: /\.css$/,
			include:[
				path.resolve(__dirname,'src'),
			],
			loader: 'style!css?modules&localIdentName=[name]__[local]__[hash:base64:5]',
		},
		{
			//针对 antd
			test: /\.css$/,
			include:[
				path.resolve(__dirname,'node_modules/antd'),
			],
			loader: 'style!css',
		},
		{
			//图片
　　　　　　test: /\.(png|jpg|gif)$/,
			include:[
				path.resolve(__dirname,'src'),
			],
　　　　　　loader: 'url-loader?limit=8192&name=images/[name].[ext]',
　　　　}],
	},

	resolve:{
		extensions:['','.js','.jsx','.scss','.css','.png','.jpg','gif'],
	},

	//引用插件
	plugins:[
		//提取公共模块插件
		new webpack.optimize.CommonsChunkPlugin({
				name:'vendors',
				chunk:['app']
			}),
		//配置开发环境
		new webpack.optimize.DedupePlugin(),
		new webpack.DefinePlugin({
   			'process.env' : {
     			NODE_ENV : JSON.stringify('production')
   			}
 		}),
 		//错误提示
		new webpack.NoErrorsPlugin(),
		//热加载错误提示
		new webpack.HotModuleReplacementPlugin(),
		//雪碧图
		new SpritesmithPlugin({
		    src: {
		        cwd: path.resolve(__dirname, 'src/images/sprite'),
		        glob: '*.png'
		    },
		    target: {
		        image: path.resolve(__dirname, 'src/images/sprite.png'),
            	css: path.resolve(__dirname, 'src/styles/sprite.css'),
		    },
		    apiOptions: {
		       cssImageRef: '../images/sprite.png'
		    },
		    spritesmithOptions: {
		        algorithm: 'top-down'
		    }
	    })
	],
};