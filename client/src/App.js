import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Footer from "./Components/Partials/Footer/Footer";
import Header from "./Components/Partials/Header/Header";
import Signup from "./Components/SignUp/Signup";
import Login from "./Components/Login/Login";
import Admin from "./Components/Admin/Admin";
import UserProfile from "./Components/UserProfile/UserProfile";
import Protected from "./Components/Auth/Protected";

import UserContextProvider from "./Context/UserContext";
import EditProfile from "./Components/EditProfile/EditProfile";

function App() {
  return (
    <UserContextProvider>
      <div className="App">
        <Header companyName="e-Shop" />
        <Routes>
          <Route
            path="/admin"
            element={
              <Protected>
                <Admin />
              </Protected>
            }
          />

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/user-profile"
            element={
              <Protected>
                <UserProfile />
              </Protected>
            }
          />

          <Route
            path="/user-profile/edit/:id"
            element={
              <Protected>
                <EditProfile />
              </Protected>
            }
          />
        </Routes>
        <Footer />
      </div>
    </UserContextProvider>
  );
}

export default App;
