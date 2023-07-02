import React, { useState, useEffect } from "react";
import styles from "../SignUp/signup.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const navigate = useNavigate();

  // useEffect(() => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Logging in...");

    // creating user object
    let userData = {
      email: email,
      password: password,
    };

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        userData
      );

      if (response?.data?.token) {
        setLoading(false);

        // extract token from response
        let token = response.data.token;

        // save token to local storage
        window.localStorage.setItem("LOGIN_TOKEN", token);

        // redirect to user profile page
        navigate(`/user-profile`);
      }
    } catch (error) {
      setErrorMsg(errorMsg);
      setLoading(false);
      console.log(error);
    }
  };
  // }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.form_container}>
        <div className={styles.form_row}>Login</div>

        {!errorMsg && loading ? (
          <div className={styles.error_msg}>Loading...</div>
        ) : (
          <div className={styles.error_msg}>{errorMsg}</div>
        )}

        <div className={styles.form_row}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            name="email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div className={styles.form_row}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            name="password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <div className={styles.form_row}>
          <input type="submit" value="Login" />
        </div>

        <div className={styles.form_row}>
          <span>
            Don't have an account? <Link to="/signup">Signup</Link>
          </span>
        </div>
      </div>
    </form>
  );
};

export default Login;
