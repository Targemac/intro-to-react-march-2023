import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Footer from "./Components/Partials/Footer/Footer";
import Header from "./Components/Partials/Header/Header";
import Signup from "./Components/SignUp/Signup";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <div className="App">
      <Header companyName="e-Shop" isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
