
import count from "./js/count";
import sum from "./js/sum";

//要想webpack打包css资源，必须引入 因为main.js是入口文件
import './css/index.css'

console.log(count(1,2));
console.log(sum(1,2,3,4))
