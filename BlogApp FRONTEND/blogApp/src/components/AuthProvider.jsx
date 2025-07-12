import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { AxiosInstance } from "../config/api";
// import BASE_URL from "../config/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        // const res = await axios.get(`${BASE_URL}/v1/users/me`, {
        //   withCredentials: true,
        // });
        const res = await AxiosInstance.get("/users/me");

        setIsAuthenticated(true);
        setUser(res.data.user);
        console.log(" User is logged in", res.data.user);
      } catch (err) {
        setIsAuthenticated(false);
        setUser(null);
        console.log(" Not logged in");
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, setIsAuthenticated, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
