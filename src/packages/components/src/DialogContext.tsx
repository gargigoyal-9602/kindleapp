//@ts-nocheck
import React, { Component } from "react";
import {  withStyles,Theme } from "@material-ui/core";
import MuiDialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
export interface DialogOptions {
  catchOnCancel?: boolean;
  title: string;
  dataToPass: any | null;
  dialogStyle?: React.CSSProperties;
  renderedComponent: React.ReactNode;
  width? : string;
  height? : string;
  withCustomDialog? : boolean;
  disableBackdropClick? : boolean,
  disableEscapeKeyDown? : boolean
}

export interface DialogProps extends DialogOptions {
  open: boolean;
  onSubmit: (data : any) => void;
  onCancel: () => void;
}

const styles = (theme : Theme) => ({
  root: {
    margin: 0,
    padding: "16px 0px 0px 24px",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: "#110f57",
  },
  dialogTitle: {
    fontFamily: "Public Sans",
    fontSize: "20px",
    fontWeight: 600,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.21,
    letterSpacing: "normal",
    color: "#343a40",
  },
});

export const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onCancel, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography component="div" className={classes.dialogTitle}>
        {children}
      </Typography>
      {onCancel ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onCancel}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});
const Dialog = withStyles((theme)=>{return {
  dialogPaper: {
    maxWidth: (props) => {
      return props?.width ? props?.width : theme.spacing(102)
    }
  }
}})((props) => {
  const { children, classes : ab, onCancel,...other } = props;
  return <MuiDialog onClose={onCancel} {...other}  classes={{paper : ab.dialogPaper}}>
      {children}
  </MuiDialog>
})

export const DialogBox: React.FC<DialogProps> = ({
  open,
  title,
  onSubmit,
  dataToPass = {},
  renderedComponent: RenderedComponent,
  onCancel,
  dialogStyle = {
    borderRadius: '4px',
    border: 'solid 1px #cdd2e0',
  },
  withCustomDialog = false,
  ...rest
}) => {
  return (
    <Dialog scroll={'body'} onCancel={onCancel} open={open} style={{ ...dialogStyle }} {...rest}>
     {!withCustomDialog && <><DialogTitle onCancel={onCancel}>
        {title}
      </DialogTitle>
      <MuiDialogContent style={{overflow : 'hidden'}}>
      {RenderedComponent && (
        <RenderedComponent
          dataToPass={dataToPass}
          onSubmit={onSubmit}
          onCancel={onCancel}
          {...rest}
        />
      )}
    </MuiDialogContent></>} 
    {withCustomDialog && RenderedComponent && (
        <RenderedComponent
          dataToPass={dataToPass}
          onSubmit={onSubmit}
          onCancel={onCancel}
          {...rest}
        />
    )}
    </Dialog>
  );
};

export const DialogContext = React.createContext<
  (options: DialogOptions) => Promise<void>
>(Promise.reject);

export const DialogProvider = ({ children }) => {
  const [dialogState, setDialogState] = React.useState<DialogOptions | null>(
    null
  );

  const awaitingPromiseRef = React.useRef<{
    resolve: () => void;
    reject: () => void;
  }>();

  const openDialogBox = (options: DialogOptions) => {
    setDialogState(options);
    return new Promise<void>((resolve, reject) => {
      awaitingPromiseRef.current = { resolve, reject };
    });
  };

  const handleCancel = () => {
    if (dialogState?.catchOnCancel && awaitingPromiseRef?.current) {
      awaitingPromiseRef.current.resolve();
    }
    setDialogState(null);
  };

  const handleSubmit = (data: any) => {
    if (awaitingPromiseRef?.current) {
      awaitingPromiseRef?.current?.resolve(data);
    }
    setDialogState(null);
  };

  return (
    <DialogContext.Provider value={openDialogBox}>
      {children}
      <DialogBox
        open={Boolean(dialogState)}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        {...dialogState}
      />
      
    </DialogContext.Provider>
  );
};
