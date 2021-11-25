// @ts-nocheck
import React, { Component } from "react";
import {DialogContext,DialogOptions} from "./DialogContext";
export type dialogBoxProps = {
  openDialogBox : (obj : DialogOptions) => Promise
}

function withDialogBox(OriginalComponent) {
  return (props) =>  {
    const  openDialogBox  = React.useContext(DialogContext);
    return (
          <OriginalComponent {...props} openDialogBox={openDialogBox}/>
      );
    
  };
}
export default withDialogBox;
