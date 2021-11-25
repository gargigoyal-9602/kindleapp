import React, { useCallback } from "react";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import Snackbar from "@material-ui/core/Snackbar";
export type ToastProps = {
  message: string;
  open?: boolean;
  onClose: Function;
  type: "success" | "error";
};
export type showToastProps = {
  message: string;
  type: string;
};
export const Toast = (props: ToastProps) => {
  const { open, onClose, message, type } = props;
  let color;
  switch (type) {
    case "success":
      color = "#357a38";
      break;
    case "error":
      color = "#d32f2f";
      break;
    default:
      color = "#313131";
      break;
  }
  const handleClose = (event: any, reason: string) => {
    onClose(event, reason);
  };
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      open={open}
      autoHideDuration={1000}
      onClose={handleClose}
    >
      <SnackbarContent
        style={{ backgroundColor: color }}
        message={<span id="toast">{message}</span>}
      />
    </Snackbar>
  );
};

export const ToastContext = React.createContext({});

export const ToastProvider: React.FunctionComponent = ({ children }) => {
  const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);
  const [dialogConfig, setDialogConfig] = React.useState<any>({});

  const openToast = ({ message, type }: showToastProps) => {
    setDialogOpen(true);
    setDialogConfig({ message, type });
  };

  const hideToast = React.useCallback((event) => {
    setDialogOpen(false);
    setDialogConfig({});
  }, []);

  return (
    <ToastContext.Provider value={{ openToast }}>
      <Toast
        open={dialogOpen}
        type={dialogConfig.type}
        message={dialogConfig.message}
        onClose={hideToast}
      />
      {children}
    </ToastContext.Provider>
  );
};
