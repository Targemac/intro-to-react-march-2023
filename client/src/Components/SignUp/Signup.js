import React, { useState } from "react";
import styles from "./signup.module.css";
import { Link } from "react-router-dom";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form>
      <div className={styles.form_container}>
        <div className={styles.form_row}>Signup</div>

        <div className={styles.form_row}>
          <input
            type="text"
            placeholder="Full name"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
          />
        </div>

        <div className={styles.form_row}>
          <input type="email" placeholder="Email" value={email} />
        </div>

        <div className={styles.form_row}>
          <input type="password" placeholder="Password" value={password} />
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
