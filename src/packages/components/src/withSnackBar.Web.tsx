// @ts-nocheck
import React, { Component } from "react";
import { ToastContext } from "./ToastContext";
import { showToastProps } from "./ToastContext";
export type withToastProps = {
  showToast: (obj: showToastProps) => void;
};
function withToast(OriginalComponent) {
  return (props) => {
    const { openToast } = React.useContext(ToastContext);
    const showToast = (options) => {
      openToast({ ...options });
    };
    return <OriginalComponent {...props} showToast={showToast} />;
  };
}
export default withToast;
