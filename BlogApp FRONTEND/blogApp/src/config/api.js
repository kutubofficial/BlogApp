import axios from "axios";

console.log("BASE_URL:", import.meta.env.VITE_BACKEND_URL);
const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
// axios.defaults.withCredentials = true;
export default BASE_URL;


export const AxiosInstance = axios.create({
    baseURL :import.meta.env.VITE_BACKEND_URL || "http://localhost:5000",
    withCredentials:true
})
