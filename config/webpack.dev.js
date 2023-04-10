const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    //入口
    entry: "./src/main.js",
    //输出
    output: {
        //__dirname 代表当前文件的文件夹目录
        path: path.resolve(__dirname, '../dist'), //绝对路径
        //js文件输出
        filename: "js/main.js",
        //自动清空上次打包内容
        //打包之前清空path属性目录下内容
        clean: true
    },
    //加载器
    module: {
        rules: [
            //loader配置
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.(png|jpe?g|webp|gif|svg)$/,
                type: 'asset/resource',
                parser: {
                    //小于10kb转base64  优点：减少请求数量 缺点：体积会变大
                    dataUrlCondition: {
                        maxSize: 10 * 1024 // 10kb
                    }
                },
                generator: {
                    //输出图片名字  hash以hash值命名 ：10前10位   ext后缀名   query可能存在查询字符 可有可无
                    filename: "static/images/[hash:10][ext][query]"
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    // options: {
                    //可以在外面新建babel.config.js来设置
                    //     presets: ['@babel/preset-env']
                    // }
                },
            }
        ]
    },
    //插件
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "../public/index.html")
        }),
        new ESLintPlugin({
            //选择要检查那些文件
            context: path.resolve(__dirname,"../src")
        }),
        new MiniCssExtractPlugin()
    ],
    devServer: {
        host: "localhost",
        port: '8080',
        open: true
    },
    //模式
    mode: "development",
    devtool: "cheap-module-source-map"
}
