import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { checkMarked, DeleteClose ,refund} from "./assets";
import './../assets/css/common.css'
import { menuLightMode, menuDarkMode } from "./assets";


export default function SimpleMenu(props: any) {
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
        className="btn"
      >
        {props.mode ?<img src={menuLightMode} className="mybook-setting-icon-light" /> :
        <img src={menuDarkMode} className="mybook-setting-icon" />}
      </button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className={`bookmenu ${props.mode && "bookMenuDark"}`}
      >
        <MenuItem onClick={handleClose}>
          <img src={checkMarked} />
          Mark as Read
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            props.handleReadSetModalClose();
          }}
        >
          <img src={refund} />
          Return Book
        </MenuItem>
      </Menu>
    </div>
  );
}
