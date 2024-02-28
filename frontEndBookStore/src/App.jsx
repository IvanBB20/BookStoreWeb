import { useEffect, useState } from "react";
import "./App.css";
import Register from "./components/Register";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import AllBooks from "./components/AllBooks";
import Cart from "./components/Cart";
import axios from "axios";
import UploadBooks from "./components/ADMIN_PAGE/UploadBooks";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async () => {
    try {
      const jwt = localStorage.getItem("jwtToken");
      const response = await axios.get("http://localhost:8080/auth/me", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      if (response.data) {
        setIsLoggedIn(true);

        return response.data;
      } else {
        setIsLoggedIn(false);
        return null;
      }
    } catch (error) {
      console.error(error);
      setIsLoggedIn(false);
      // throw error;
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />}></Route>
        <Route
          path="/login"
          element={<Login handleLogin={handleLogin} />}
        ></Route>
        <Route
          path="/books"
          element={
            <AllBooks
              isLoggedIn={isLoggedIn}
              handleLogin={handleLogin}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        ></Route>

        <Route path="/cart" element={<Cart handleLogin={handleLogin} />}>
          {" "}
        </Route>

          <Route
            path="/admin"
            element={
              <UploadBooks
              />
            }
          >
            {" "}
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
