import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { checkMarked, DeleteClose } from "./assets";
//import {Rating} from "@mui/material";
import { Rating } from "@material-ui/lab";
//@material-ui/lab/Rating";
import { withRouter } from "react-router-dom";

function SimpleMenu(props: any) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {/* <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        Open Menu
      </Button> */}
      <button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        className={`btn ${props.mode && "dark-back"}`}
      />
      <Menu
        id="dynamic-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className={`${props.mode && "rate-dark"}`}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            props.history.push(`/Rating/${props.noteId}`);
          }}
        >
          <Rating name={"vbnm"} value={1} max={1} />
          Rate Note
        </MenuItem>
        {/* <MenuItem onClick={handleClose}>
          <img src={checkMarked} />
          Mark as Read
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose;
            props.handleReadSetModalClose();
          }}
        >
          <img src={checkMarked} />
          Return Book
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <img src={DeleteClose} />
          Delete
        </MenuItem> */}
      </Menu>
    </div>
  );
}
export default withRouter(SimpleMenu);
