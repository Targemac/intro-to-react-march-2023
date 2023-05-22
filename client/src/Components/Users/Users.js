import React from "react";
import styles from "./users.module.css";
import User from "./User";

// fetching data
import users from "../../Apis/userData";

const Users = () => {
  return (
    <div className={styles.container}>
      {/* start of render list */}
      {users.map((user, index, array) => {
        return <User key={user.id} user={user} />;
      })}
      {/* end of render list */}
    </div>
  );
};

export default Users;
