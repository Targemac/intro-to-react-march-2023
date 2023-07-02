import { useState, useEffect } from "react";
import axios from "axios";

export const FetchUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    const getUser = async () => {
      try {
        let token = window.localStorage.getItem("LOGIN_TOKEN");
        setLoading(true);
        let response = await axios.get("http://localhost:5000/api/users/user", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response) {
          setLoading(false);
          // console.log(response.data.data);
          setData(response.data.data);
        }
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    };
    getUser();
  }, []);

  return { loading, error, data };
};
