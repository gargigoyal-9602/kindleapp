//@ts-nocheck
import React, { useCallback } from "react";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "@material-ui/core/Button";
export type openDialogProps = {
  title : string, message : string
}
export type alertDialogProps = {
  title : string, message : string, open? : boolean,onConfirm:Function
}
export interface AlertDialogOptions {
  title: string;
  message: any | null;
}
export const AlertDialog = (props : alertDialogProps) => {
  const {open,onConfirm,title,message} = props;
  return <Dialog
        open={open}
        onClose={onConfirm}
        maxWidth="sm"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText  id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{onConfirm(message)}}  variant="outlined" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
}

export const AlertDialogContext =  React.createContext<
(options: DialogOptions) => Promise<void>
>(Promise.reject);

export const AlertDialogProvider = ({ children }) => {
  const [dialogState, setDialogState] = React.useState<AlertDialogOptions | null>(
    null
  );

  const awaitingPromiseRef = React.useRef<{
    resolve: () => void;
    reject: () => void;
  }>();

  const openDialogBox = (options: AlertDialogOptions) => {
    setDialogState(options);
    return new Promise<void>((resolve, reject) => {
      awaitingPromiseRef.current = { resolve, reject };
    });
  };

  const handleCancel = () => {
    if (dialogState.catchOnCancel && awaitingPromiseRef.current) {
      awaitingPromiseRef.current.resolve();
    }
    setDialogState(null);
  };

  const handleSubmit = (data: any) => {
    setDialogState(null);
    if (awaitingPromiseRef.current) {
      return awaitingPromiseRef.current.resolve(data);
    }
    
  };
  return (
    <AlertDialogContext.Provider value={ openDialogBox }>
      <AlertDialog
        open={Boolean(dialogState)}
        onConfirm={handleSubmit}
        {...dialogState}
      />
      {children}
    </AlertDialogContext.Provider>
  );
};

