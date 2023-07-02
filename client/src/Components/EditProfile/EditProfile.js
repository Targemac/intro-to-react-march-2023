import React, { useState, useContext, useEffect } from "react";
import styles from "../SignUp/signup.module.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import { UserContext } from "../../Context/UserContext";
import { FetchUser } from "../../Apis/fetchUser";

const EditProfile = () => {
  const { id } = useParams();
  // console.log(id);

  const { userData, userLoading } = useContext(UserContext);

  let first = userLoading ? "Loading..." : userData.firstName;
  let last = userLoading ? "Loading..." : userData.lastName;

  const [firstName, setFirstName] = useState(first);
  const [lastName, setLastName] = useState(last);

  console.log(firstName, lastName);

  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.put(
        `http://localhost:5000/api/users/${id}`,
        {
          firstName: firstName,
          lastName: lastName,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${window.localStorage.getItem(
              "LOGIN_TOKEN"
            )}`,
          },
        }
      );

      if (res) {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.form_container}>
        <div className={styles.form_row}>Update Profile</div>

        {loading && !error ? (
          <div className={styles.form_row}>Loading...</div>
        ) : (
          <div className={styles.form_row}>{error}</div>
        )}

        {!error && <div className={styles.form_row}>{data}</div>}

        <div className={styles.form_row}>
          <input
            type="text"
            placeholder="First name"
            value={firstName}
            name="firstName"
            onChange={(event) => setFirstName(event.target.value)}
          />
        </div>
        <div className={styles.form_row}>
          <input
            type="text"
            placeholder="Last name"
            value={lastName}
            name="lastName"
            onChange={(event) => setLastName(event.target.value)}
          />
        </div>

        <div className={styles.form_row}>
          <input type="submit" value="Update Profile" />
        </div>
      </div>
    </form>
  );
};

export default EditProfile;
