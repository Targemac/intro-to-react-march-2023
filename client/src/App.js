import { useState } from "react";

import "./App.css";
import Footer from "./Components/Partials/Footer/Footer";
import Header from "./Components/Partials/Header/Header";
import Users from "./Components/Users/Users";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <div className="App">
      <Header companyName="e-Shop" isLoggedIn={isLoggedIn} />

      <Users />

      <Footer />
    </div>
  );
}

export default App;
