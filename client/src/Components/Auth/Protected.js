import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Protected = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    const LOGIN_TOKEN = window.localStorage.getItem("LOGIN_TOKEN");

    // IF NO LOGIN TOKE, REDIRECT TO LOGIN PAGE
    if (!LOGIN_TOKEN) {
      navigate("/login");
    }
  }, [navigate]);

  return <div> {props.children} </div>;
};

export default Protected;
