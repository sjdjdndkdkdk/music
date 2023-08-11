import axios from "axios"
// 封装接口
let service = axios.create({
    // 封装基础路径
    baseURL:"http://localhost:3000/",
    timeout:3000
})
// daochu
export default service