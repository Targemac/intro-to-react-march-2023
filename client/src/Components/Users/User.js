import React from "react";
import styles from "./users.module.css";
import userImage from "../../Assets/graphics/1-11823_circle-location-icon-png-transparent-png.png";

function User(props) {
  return (
    <div className={styles.user_grp}>
      <div className={styles.avatar}>
        <img src={userImage} alt="" />
      </div>
      <div className={styles.name}> {props.user.name} </div>
    </div>
  );
}

export default User;
