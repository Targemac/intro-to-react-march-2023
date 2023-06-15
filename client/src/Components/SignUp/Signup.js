import React, { useState } from "react";
import styles from "./signup.module.css";
import { Link } from "react-router-dom";

const Signup = () => {
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
        <div className={styles.form_row}>Signup</div>

        {errorMsg && (
          <div className={styles.error_msg}>All fields are required!</div>
        )}

        <div className={styles.form_row}>
          <input
            type="text"
            placeholder="Full name"
            value={fullName}
            name="fullName"
            onChange={(event) => setFullName(event.target.value)}
          />
        </div>

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
          <input type="submit" value="Signup" />
        </div>

        <div className={styles.form_row}>
          <span>
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </div>
      </div>
    </form>
  );
};

export default Signup;
