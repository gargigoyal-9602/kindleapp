// @ts-nocheck
import React, { Component } from "react";
import {AlertDialogContext} from "./AlertBoxContext";
import { openDialogProps } from "./AlertBoxContext";
export type withAlertBoxProps = {
  showAlert : (obj : openDialogProps) => Promise
}
function withAlertBox(OriginalComponent) {
  return (props) =>  {
    const  openDialogBox  = React.useContext(AlertDialogContext);
    const showAlert = async (options) => {
       const msg =  await openDialogBox({  ...options});
       return Promise.resolve(msg);
      }
      return (
          <OriginalComponent {...props} showAlert={showAlert}/>
      );
  };
}
export default withAlertBox;
