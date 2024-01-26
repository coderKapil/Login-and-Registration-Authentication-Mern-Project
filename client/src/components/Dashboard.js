import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "./Context Provider/Context";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
const Dashboard = () => {
  const { loginData, setLoginData } = useContext(LoginContext);
  const [data, setData] = useState(false);
  // useNavigate hook is used to go from one page to another page
  const history = useNavigate();
  // this function is used to validate the user to show dashboard we will get the token which we have stored at the time of login in local storage
  const DashboardValid = async () => {
    let token = localStorage.getItem("usersdatatoken");
    // passing get token into authorization header
    const res = await fetch("/validuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const data = await res.json();
    if (data.status === 401 || !data) {
      history("*");
    } else {
      console.log("user verified");
      setLoginData(data);
      history("/dash");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      DashboardValid();
      setData(true);
    }, 3000);
  }, []);

  return (
    <>
      {data ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src="./man.png"
            style={{ width: "200px", marginTop: 20 }}
            alt="manimage"
          />
          <h1> User Email:{loginData ? loginData.validUserOne?.email : ""}</h1>
        </div>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          Loading...
          <CircularProgress />
        </Box>
      )}
    </>
  );
};

export default Dashboard;
