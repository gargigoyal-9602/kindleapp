import React from "react";
import Button from "@material-ui/core/Button";
import { MenuItem, Box, Menu } from "@material-ui/core";
// import { checkMarked, DeleteClose, refund } from "./assets";
import "../../catalogue/assets/css/common.css";
// import { menuLightMode, menuDarkMode } from "./assets";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  threeDot,
  threeDotDark,
  EditIcon,
  BlockIcon,
  DeleteIcon,
  booklist,
} from "./assets";

export default function SimpleMenu(props: any) {
  const { indexId, mode, handleCloseModal, status } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const location = window.location.pathname.split("/")[2];
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    status == "suspended"
      ? toast.error(
          "This Account is Suspended , you cannot take any action for this account"
        )
      : setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <img
          src={mode ? threeDotDark : threeDot}
          width={mode ? "18px" : "22px"}
          alt="action icon"
        />
      </Button>

      {/* menu for student and publisher list */}
      {(location == "publishers" ||
        location == "students" ||
        location == "Subscriptions" ||
        location == "Packages") && (
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          className={`${props.mode && "bookMenuDark"}`}
        >
          {location != "Subscriptions" && location != "Packages" && (
            <MenuItem
              onClick={() => {
                handleClose();
                handleCloseModal("edit", indexId);
              }}
            >
              <img src={EditIcon} width="18px" alt="icon" />
              Edit
            </MenuItem>
          )}
          <MenuItem
            onClick={() => {
              handleClose();
              {
              }
              handleCloseModal(
                status == "blocked" ? "active" : "blocked",
                indexId
              );
            }}
          >
            <img src={BlockIcon} width="20px" alt="icon" />
            {status == "blocked" ? "UnBlock" : "Block"}
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              handleCloseModal("suspended", indexId);
            }}
          >
            <img src={DeleteIcon} width="15px" alt="icon" />
            Delete
          </MenuItem>
        </Menu>
      )}

      {/* menu for all books */}
      {location == "AllBooks" && (
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          className={`${props.mode && "bookMenuDark"}`}
        >
          <MenuItem
            onClick={() => {
              handleClose();
              handleCloseModal("edit", indexId);
            }}
          >
            <img src={EditIcon} width="18px" alt="icon" />
            Edit
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              handleCloseModal(
                status == "blocked" ? "active" : "blocked",
                indexId
              );
            }}
          >
            <img src={booklist} width="20px" alt="icon" />
            Unlist
            {/* {status == "blocked" ? "UnBlock" : "Block"} */}
          </MenuItem>
        </Menu>
      )}
    </>
  );
}
