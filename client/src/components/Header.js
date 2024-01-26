import Avatar from "@mui/material/Avatar";
import "./header.css";
import React, { useContext } from "react";
import { LoginContext } from "./Context Provider/Context";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const { loginData, setLoginData } = useContext(LoginContext);
  const history = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutUser = async () => {
    let token = localStorage.getItem("usersdatatoken");

    const res = await fetch("/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        Accept: "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();
    console.log(data);

    if (data.status == 201) {
      console.log("user logout");
      localStorage.removeItem("usersdatatoken");
      setLoginData(false);
      history("/");
    } else {
      console.log("error");
    }
  };
  const goDash = () => {
    history("/dash");
  };

  const goError = () => {
    history("*");
  };

  return (
    <>
      <header>
        <nav>
          <NavLink to="/">
            <h1>Fast Cloud</h1>
          </NavLink>
          <div className="avtar">
            {loginData.validUserOne ? (
              <Avatar
                style={{
                  background: "salmon",
                  fontWeight: "bold",
                  textTransform: "capitalize",
                }}
                onClick={handleClick}
              >
                {loginData.validUserOne.fname[0].toUpperCase()}
              </Avatar>
            ) : (
              <Avatar style={{ background: "blue" }} onClick={handleClick} />
            )}
          </div>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {loginData.validUserOne
              ? [
                  <>
                    <MenuItem
                      onClick={() => {
                        goDash();
                        handleClose();
                      }}
                    >
                      Profile
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        logoutUser();
                        handleClose();
                      }}
                    >
                      Logout
                    </MenuItem>
                  </>,
                ]
              : [
                  <MenuItem
                    onClick={() => {
                      goError();
                      handleClose();
                    }}
                  >
                    Profile
                  </MenuItem>,
                ]}
          </Menu>
        </nav>
      </header>
    </>
  );
};

export default Header;
