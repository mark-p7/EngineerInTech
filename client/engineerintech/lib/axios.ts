import axios from "axios";

export const customAxios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8888/api",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
        "Access-Control-Allow-Credentials": "true",
    },
});

export default customAxios;

