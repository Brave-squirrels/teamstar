import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { history } from "../index";

const address =
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

axios.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error: AxiosError) => {
    const { data, status, config } = error.response!;
    switch (status) {
      case 400:
        toast.error("🦄 Wow so easy!", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        break;
      case 401:
        toast.error("unathorized");
        break;
      case 404:
        history.push("/not-found");
        break;
      case 500:
        toast.info("Internal server error");
        break;
    }
    return Promise.reject(error);
  }
);

export default instance;
