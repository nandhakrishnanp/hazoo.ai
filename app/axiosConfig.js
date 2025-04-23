import axios from "axios";


const axiosInstance = axios.create({
    baseURL: "https://hazoo-ai.onrender.com",
});
//192.168.11.170-172.16.44.127
export default axiosInstance;