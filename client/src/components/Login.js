import React, { useState } from "react";
import "./mix.css";
import { NavLink, useNavigate } from "react-router-dom";
const Login = () => {
  const [passShow, setPassShow] = useState(false);

  const [inpVal, setInpval] = useState({
    email: "",
    password: "",
  });

  const history = useNavigate();

  const setVal = (e) => {
    // console.log(e.target.value);
    const { name, value } = e.target;
    setInpval(() => {
      return { ...inpVal, [name]: value };
    });
  };

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = inpVal;
    //   for Validation part
    if (email === "") {
      alert("please enter your email");
    } else if (!email.includes("@")) {
      alert("please entre a valid email");
    } else if (password === "") {
      alert("Please enter your password");
    } else if (password.length < 6) {
      alert("Password must contain atleast 6 character");
    } else {
      // console.log("User successfully Logged In!!!");
      const data = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const resp = await data.json();
      // console.log(resp);
      if (resp.status === 201) {
        localStorage.setItem("usersdatatoken", resp.result.token);
        history("/dash");
        setInpval({
          ...inpVal,

          email: "",
          password: "",
        });
      }
    }
  };
  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Welcome Back, Log In</h1>
            <p>Hi, we are glad that you are back, Please login</p>
          </div>
          <form>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={inpVal.email}
                onChange={setVal}
                placeholder="Enter your Email"
              />
            </div>

            <div className="form_input">
              <label htmlFor="password">Password</label>
              <div className="two">
                <input
                  type={!passShow ? "password" : "text"}
                  name="password"
                  id="password"
                  value={inpVal.password}
                  onChange={setVal}
                  placeholder="Enter your Password"
                />
                <div
                  className="showpass"
                  onClick={() => setPassShow(!passShow)}
                >
                  {!passShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>
            <button className="btn" onClick={loginUser}>
              Login
            </button>
            <p>
              Don't Have An Account ?{" "}
              <NavLink to="/register"> Sign Up </NavLink>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
