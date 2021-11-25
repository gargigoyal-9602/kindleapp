// @ts-nocheck
import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

function withConfirmBox(OriginalComponent) {
  return class extends Component {
    state = {
      open: false,
      title: "",
      message: "",
      onClose: null,
    };
    openConfrimBox = (title: string, message: string, onClose: Function) => {
      this.setState({
        title: title,
        message: message,
        open: true,
        onClose: onClose,
      });
    };
    handleClose = (data?: any) => {
      this.setState({ open: false }, () => {
        this.state.onClose(data);
      });
    };
    render() {
      return (
        <>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title" >
              <span >{this.state.title}</span>
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description" >
                {this.state.message}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                
                onClick={() => {
                  this.handleClose("Yes");
                }}
                color="primary"
              >
                Yes
              </Button>
              <Button
                onClick={() => {
                  this.handleClose("No");
                }}
                color="primary"
                autoFocus
              >
                No
              </Button>
            </DialogActions>
          </Dialog>
          <OriginalComponent {...this.props} openConfirmDialog={this.openConfrimBox} />
        </>
      );
    }
  };
}
export default withConfirmBox;
