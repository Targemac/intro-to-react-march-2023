import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const DeleteUser = (id) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const deleteUser = async () => {
      try {
        let token = window.localStorage.getItem("LOGIN_TOKEN");
        setLoading(true);

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
          setLoading(false);
          // console.log(response.data.data);
          setData(response.data.data);
          navigate("/signup");
          window.localStorage.removeItem("LOGIN_TOKEN");
        }
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    };
    deleteUser();
  }, [id, navigate]);

//   return { loading, error, data };
};
