import { Toaster, toast } from "react-hot-toast";


export const ToastError = (message) => {
    toast.error(message, {
        style: {
            backgroundColor: "#FF8A8A",
            color: "black",
        },
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
    });
};


export const ToastSuccess = (message) => {
    toast.success(message, {
        style: {
            backgroundColor: "#C2FFC7",
            color: "black",
        },
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
    });
}

export const ToastInfo = (message) => {
    toast.success(message, {
        style: {
            backgroundColor: "#FBF3B9",
            color: "black",
        },
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
    });
}