import axios from "axios"

const API_URL  = "http://localhost:8001/api/"


export const http = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-type": "application/json",
    },
});