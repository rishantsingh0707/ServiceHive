import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      setAuth(JSON.parse(storedAuth));
    }
    setLoading(false);
  }, []);


  const login = async (email, password) => {
    const res = await api.post("/api/auth/login", { email, password });

    localStorage.setItem("auth", JSON.stringify(res.data));
    setAuth(res.data);    
    return res.data;
  };


  const register = async (data) => {
    const res = await api.post("/api/auth/register", data);
    setAuth(res.data);
    return res.data;
  };

  const logout = async () => {
    await api.post("/api/auth/logout");
    setAuth(null);
  };


  return (
    <AuthContext.Provider
      value={{ auth, login, register, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
