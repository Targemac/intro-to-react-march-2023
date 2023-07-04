import { createContext, useState } from "react";

import { FetchUser } from "../Apis/fetchUser";
import { FetchAllUsers } from "../Apis/fetchAllUsers";
import { DeleteUser } from "../Apis/deleteUser";

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const {
    loading: userLoading,
    error: userError,
    data: userData,
  } = FetchUser();

  const {
    loading: allUsersLoading,
    error: allUsersError,
    data: allUsersData,
  } = FetchAllUsers();

  const token = window.localStorage.getItem("LOGIN_TOKEN");
  let isLoggedIn = false;

  if (token) {
    isLoggedIn = true;
  }

  const data = {
    userLoading,
    userError,
    userData,
    isLoggedIn,
    allUsersLoading,
    allUsersError,
    allUsersData,
    DeleteUser,
  };

  return (
    <UserContext.Provider value={data}>{props.children}</UserContext.Provider>
  );
};

export default UserContextProvider;
