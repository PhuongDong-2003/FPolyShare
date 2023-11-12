import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const toastNotifi = (message, type = "info") => {
  toast[type](message, {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};
