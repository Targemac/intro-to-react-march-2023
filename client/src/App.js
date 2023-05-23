import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Footer from "./Components/Partials/Footer/Footer";
import Header from "./Components/Partials/Header/Header";
import Signup from "./Components/SignUp/Signup";
import Login from "./Components/Login/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      <Header companyName="e-Shop" isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
