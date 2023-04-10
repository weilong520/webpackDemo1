module.exports = {
    //继承eslint规则
    extends: ["eslint:recommended"],
    env: {
        node: true, //启用node全局变量
        browser: true  //启用浏览器中的全局变量
    },
    parserOptions: {
        ecmaVersion: 6, //es6
        sourceType: "module" //es module
    },
    rules: {
        "no-var":2, //不能使用var定义变量
    }
}
