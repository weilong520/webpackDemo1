const path = require("path")
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const os = require("os");
const TerserWebpackPlugin = require("terser-webpack-plugin");

const threads = os.cpus().length; //cpu核数

module.exports = {
    //入口
    entry: "./src/main.js",
    //输出
    output: {
        //__dirname 代表当前文件的文件夹目录
        path: path.resolve(__dirname, '../dist'), //绝对路径
        //js文件输出
        filename: "static/js/main.js",
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
                use: [
                    {
                        loader: "thread-loader",
                        options: {
                            workers: threads, //进程数量

                        }
                    },
                    {
                    loader: "babel-loader",
                    // options: {
                    //可以在外面新建babel.config.js来设置
                    //     presets: ['@babel/preset-env']
                    // }
                }]
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
        threads,
        new MiniCssExtractPlugin({
            filename: "static/css/main.css"
        }),
    ],
    //模式
    mode: "production",
    devtool: "source-map",
    optimization: {
        //压缩的处理
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserWebpackPlugin({
                parallel: threads //开启多线程和设置进程数量
            })
        ]
    }
}
