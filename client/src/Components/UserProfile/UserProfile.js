import { useContext } from "react";
import styles from "./userProfile.module.css";
import { UserContext } from "../../Context/UserContext";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const { userLoading, userError, userData } = useContext(UserContext);

  return (
    <section className={styles.wrapper}>
      {userLoading && !userError ? (
        "Loading..."
      ) : userError ? (
        userError
      ) : (
        <>
          <h1>
            {userData.firstName} {userData.lastName}
          </h1>
          <h3>{userData.email}</h3>
          <div>
            <Link to={`/user-profile/edit/${userData.id}`}>
              Edit my profile
            </Link>
            <button>Delete my profile</button>
          </div>
          <br />
        </>
      )}
    </section>
  );
};

export default UserProfile;
