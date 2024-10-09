import { toast } from "react-toastify";

export const showToast = (el: string) => {
  toast.error(`${el}`, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export const theme = {
  colors: {
    font: "black",
    primary: "#0d6efd",
    secondary: "#0000002d",
    error: "#ff6c15",
    primary_hover: "#0b5ed7",
  },
  flex: {
    contentCenter: `
      display: flex;
      align-items: center;
      justify-content: center;
    `,
    contentBetween: `
      display: flex;
      align-items: center;
      justify-content: space-between;
    `,
    itemsCenter: `
      display: flex;
      align-items: center;
    `,
    directionColumn: `
      display: flex;
      flex-direction: column;
    `,
  },
};
