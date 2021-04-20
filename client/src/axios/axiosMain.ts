import axios from "axios";

const address = process.env.SERVER_ADDRESS || "http://localhost:5000";

const instance = axios.create({
  baseURL: address,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
  },
});

export default instance;
