import axios from "axios";

export const api =axios.create({
    baseURL: "http://localhost:2500",
    timeout: 1000000
})

api.interceptors.request.use(
async (config)=>{
    const token = localStorage.getItem("token")
    console.log(token);
    config.headers.Authorization = `Bearer ${token}`
    return config;
});

