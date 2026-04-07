import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../api/axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);

  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  const logout = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
  };

  const fetchCurrentUser = async () => {
    try {
      if (!token) return;

      const { data } = await axiosInstance.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setUser(data.user);
      }
    } catch (error) {
      console.log("Fetch User Error:", error.message);
      logout();
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };