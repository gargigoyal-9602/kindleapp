// @ts-nocheck
import React, { Component } from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
export type withLoaderProps = {
  showLoader : () => void,
  hideLoader : () => void,
}

function withLoader(OriginalComponent) {
  return class extends Component {
    state = {
      isLoading: false,
    };
    showLoader = () => {
      this.setState({
        isLoading: true,
      });
    };
    hideLoader = () => {
      this.setState({ isLoading: false });
    };

    render() {
      return (
        <>
          {this.state.isLoading && (
            <Backdrop style={{ zIndex: 99999 }} open={this.state.isLoading}>
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                  <CircularProgress size="5rem" color="primary" />
              </div>
              </Backdrop>
          )}
          <OriginalComponent
            {...this.props}
            showLoader={this.showLoader}
            hideLoader={this.hideLoader}
          />
        </>
      );
    }
  };
}
export default withLoader;
