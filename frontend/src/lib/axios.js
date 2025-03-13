import axios from "axios";

export const axiosInstance = axios.create({
    baseURL:  'https://telegrambackend-sand.vercel.app/api',
    withCredentials: true
})
