import axios from "axios";

const address =
  process.env.REACT_APP_ENV === "development"
    ? "http://localhost:5000"
    : "https://bravesquirrels2021.herokuapp.com";

export const ENDPOINT = 
  process.env.REACT_APP_ENV === "development"
    ? "http://localhost:5000"
    : "https://bravesquirrels2021.herokuapp.com";

const instance = axios.create({
  baseURL: address,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
  },
});

export default instance;
