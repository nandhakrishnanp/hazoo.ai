import axios from "axios";


const axiosInstance = axios.create({
    baseURL: "http://192.168.35.170:3000",
});
//192.168.11.170-172.16.44.127
export default axiosInstance;