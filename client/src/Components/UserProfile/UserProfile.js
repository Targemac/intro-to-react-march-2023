import { useContext } from "react";
import styles from "./userProfile.module.css";
import { UserContext } from "../../Context/UserContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserProfile = () => {
  const { userLoading, userError, userData } = useContext(UserContext);

  const navigate = useNavigate();

  const deleteUser = async (id) => {
    try {
      let token = window.localStorage.getItem("LOGIN_TOKEN");

      let response = await axios.delete(
        `http://localhost:5000/api/users/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response) {
        // console.log(response.data.data);
        navigate("/signup");
        window.localStorage.removeItem("LOGIN_TOKEN");
      }
    } catch (error) {
      console.log(false);
    }
  };

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
            <button onClick={deleteUser(userData.id)}>Delete my profile</button>
          </div>
          <br />
        </>
      )}
    </section>
  );
};

export default UserProfile;
