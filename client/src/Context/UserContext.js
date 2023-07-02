import { createContext, useState } from "react";

import { FetchUser } from "../Apis/fetchUser";
export const UserContext = createContext();

const UserContextProvider = (props) => {
  const {
    loading: userLoading,
    error: userError,
    data: userData,
  } = FetchUser();

  const token = window.localStorage.getItem("LOGIN_TOKEN");
  let isLoggedIn = false;

  if (token) {
    isLoggedIn = true;
  }

  const data = { userLoading, userError, userData, isLoggedIn };

  return (
    <UserContext.Provider value={data}>{props.children}</UserContext.Provider>
  );
};

export default UserContextProvider;
