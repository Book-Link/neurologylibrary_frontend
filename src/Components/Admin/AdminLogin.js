import React, { useState, useEffect } from "react";
import "./Admin.css";
import { useHistory } from "react-router-dom";

const AdminLogin = () => {
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPass, setAdminPass] = useState("");
  const [errorMsg, setErrorMsg] = useState(false);
  const history = useHistory();

  const emaildata = "admin@gmail.com";
  const passData = "123admin";
  const handleAdminSubmit = (e) => {
    e.preventDefault();
    // if (adminEmail === emaildata && adminPass === passData) {
    //   history.push("/dashboard");
    // } else {
    //
    // }
    if (adminEmail === emaildata && adminPass === passData) {
      sessionStorage.setItem("emailToken", emaildata);
      sessionStorage.setItem("passToken", passData);
      history.push("/dashboard");
    } else {
      setErrorMsg(true);
    }
  };

  return (
    <div className="loginBody">
      <div className="screen">
        <div className="screen__content">
          <form className="login" onSubmit={handleAdminSubmit}>
            <div className="login__field">
              <input
                required
                type="email"
                className="login__input"
                placeholder="Email"
                onChange={(e) => setAdminEmail(e.target.value)}
              />
            </div>
            <div className="login__field">
              <input
                required
                type="password"
                className="login__input"
                placeholder="Password"
                onChange={(e) => setAdminPass(e.target.value)}
              />
            </div>
            <button className="button login__submit">
              <span className="button__text" type="submit">
                Log In Now
              </span>
            </button>
          </form>
          {errorMsg && (
            <div className="alert alert-danger text-center" role="alert">
              <strong>Wrong Credentials..!</strong>
            </div>
          )}
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
