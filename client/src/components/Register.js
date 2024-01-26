import React, { useState } from "react";
import "./mix.css";
import { NavLink } from "react-router-dom";
const Register = () => {
  // These are for show and hide password functionality
  const [passShow, setPassShow] = useState(false);
  const [cpassShow, setcPassShow] = useState(false);

  const [inpVal, setInpval] = useState({
    fname: "",
    email: "",
    password: "",
    cpassword: "",
  });
  // console.log(inpVal);

  const setVal = (e) => {
    // console.log(e.target.value);
    const { name, value } = e.target;
    setInpval(() => {
      return { ...inpVal, [name]: value };
    });
  };

  const addUserData = async (e) => {
    e.preventDefault();
    const { fname, email, password, cpassword } = inpVal;
    //   for Validation part
    if (fname === "") {
      alert("Please enter your name");
    } else if (email === "") {
      alert("please enter your email");
    } else if (!email.includes("@")) {
      alert("please entre a valid email");
    } else if (password === "") {
      alert("Please enter your password");
    } else if (password.length < 6) {
      alert("Password must contain atleast 6 character");
    } else if (cpassword === "") {
      alert("Please enter your Confirm password");
    } else if (password.length !== cpassword.length) {
      alert("Password and Confirm password does not match");
    } else {
      // console.log("User registration successfully done!!!");
      const data = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fname,
          email,
          password,
          cpassword,
        }),
      });

      const resp = await data.json();
      // console.log(resp.status);
      if (resp.status === 201) {
        alert("user registration done");
        setInpval({
          ...inpVal,
          fname: "",
          email: "",
          password: "",
          cpassword: "",
        });
      }
    }
  };
  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Sign Up</h1>
            <p style={{ textAlign: "center" }}>
              We are glad that you will be using Fast Clouds to manage
              <br /> your tasks ! We hope that you will like it.
            </p>
          </div>
          <form>
            <div className="form_input">
              <label htmlFor="fname">Name</label>
              <input
                type="text"
                name="fname"
                id="fname"
                onChange={setVal}
                value={inpVal.fname}
                placeholder="Enter your Name"
              />
            </div>

            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={setVal}
                value={inpVal.email}
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
                  onChange={setVal}
                  value={inpVal.password}
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
            <div className="form_input">
              <label htmlFor="cpassword">Confirm Password</label>
              <div className="two">
                <input
                  type={!cpassShow ? "password" : "text"}
                  name="cpassword"
                  id="cpassword"
                  onChange={setVal}
                  value={inpVal.cpassword}
                  placeholder="Confirm Password"
                />
                <div
                  className="showpass"
                  onClick={() => setcPassShow(!cpassShow)}
                >
                  {!cpassShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>
            <button className="btn" onClick={addUserData}>
              Sign Up
            </button>
            <p>
              Already Have An Account ? <NavLink to="/">Log In</NavLink>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default Register;
