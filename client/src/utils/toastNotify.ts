import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { history } from "../index";

const toastNofity = (status: number, text?: string) => {
    switch (status) {
        case 400:
            return toast.error(text ? text : "🦄 Wow so easy!", {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        case 401:
            return toast.error(text ? text : "unathorized");
        case 404:
            history.push("/not-found");
            break;
        case 500:
            return toast.info(text ? text : "Internal server error");
        case 200:
            return toast.info(text ? text : 'Success!');
        default:
            return;
    }
}
export default toastNofity;