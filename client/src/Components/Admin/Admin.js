import { useContext } from "react";
import styles from "./admin.module.css";
import { UserContext } from "../../Context/UserContext";

const Admin = () => {
  const {
    userData,
    userLoading,
    userError,
    allUsersLoading,
    allUsersError,
    allUsersData,
  } = useContext(UserContext);

  console.log(allUsersData);

  let firstname = userData?.firstName;
  let lastname = userData?.lastName;

  return (
    <section className={styles.wrapper}>
      <div className={styles.head}>
        Admin:
        {userLoading && !userError ? (
          "Loading..."
        ) : (
          <span className={styles.firstName}>
            {firstname} {lastname}
          </span>
        )}
      </div>
      <div className={styles.body}>
        <table className={styles.table_wrapper}>
          <thead className={styles.table_head}>
            <tr>
              <th>S/N</th>
              <th>First name</th>
              <th>Last name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody className={styles.table_body}>
            {allUsersData.map((user, index, arr) => (
              <tr>
                <td> {index + 1} </td>
                <td> {user.firstName} </td>
                <td> {user.lastName} </td>
                <td> {user.email} </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Admin;
