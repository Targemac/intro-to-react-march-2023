import React, { useState } from "react";
import styles from "./signup.module.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log("Signing up...");

    // creating user object
    let userData = {
      firstName: fullName?.split(" ")[0] ? fullName.split(" ")[0] : "",
      lastName: fullName?.split(" ")[1] ? fullName.split(" ")[1] : "",
      email: email,
      password: password,
    };

    // communication with backend
    setLoading(true);
    axios
      .post("http://localhost:5000/api/users/register", userData)
      .then((response) => {
        // console.log(response.data.message);
        setData(response.data.message);
        setLoading(false);
      })
      .catch((error) => {
        // console.log(error.response.data.message);
        setError(error.response.data.message);
        setLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.form_container}>
        <div className={styles.form_row}>Signup</div>

        {loading && !error ? (
          <div className={styles.form_row}>Loading...</div>
        ) : (
          <div className={styles.form_row}>{error}</div>
        )}

        {!error && <div className={styles.form_row}>{data}</div>}

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
