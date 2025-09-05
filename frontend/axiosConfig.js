import axios from "axios";


const axiosInstance = axios.create({
    baseURL: "https://hazoo-50027852561.development.catalystappsail.in",
});

export default axiosInstance;