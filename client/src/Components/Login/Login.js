import React, { useState } from "react";
import styles from "../SignUp/signup.module.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Signing up...");

    // validating data
    if (!fullName || !email || !password) {
      setErrorMsg(true);
    } else {
      setErrorMsg(false);
    }

    // creating user object
    let userData = {
      firstName: fullName?.split(" ")[0] ? fullName.split(" ")[0] : "",
      lastName: fullName?.split(" ")[1] ? fullName.split(" ")[1] : "",
      email: email,
      password: password,
    };

    if (errorMsg === false) {
      // submit data to back-end
    }

    console.log(userData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.form_container}>
        <div className={styles.form_row}>Login</div>

        {errorMsg && (
          <div className={styles.error_msg}>All fields are required!</div>
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
