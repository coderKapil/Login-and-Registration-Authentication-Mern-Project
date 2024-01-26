import Dashboard from "./components/Dashboard";
import Error from "./components/Error";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "./components/Context Provider/Context";
function App() {
  const [data, setData] = useState(false);
  const { loginData, setLoginData } = useContext(LoginContext);
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
      console.log("User not valid");
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
        <>
          {" "}
          <Header />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dash" element={<Dashboard />} />
            <Route path="*" element={<Error />} />
          </Routes>{" "}
        </>
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
}

export default App;
