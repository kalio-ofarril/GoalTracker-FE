import { useContext, createContext, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { login, signUp, signUpGoogle, loginGoogle } from "../api/userApi";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const navigate = useNavigate();

  const loginAction = (data) => {
    login(data.email, data.password)
      .then((res) => {
        setError(" ");
        setUser(res.data.userId);
        setToken("goalTracker");
        localStorage.setItem("email", res.data.email);
        localStorage.setItem("userId", res.data.userId);
        localStorage.setItem("token", "goalTrackerToken");
        localStorage.setItem("login", new Date());
        navigate("/");
        return;
      })
      .catch((res) => {
        loginError(res.response.data);
      });
  };

  const loginGoogleAction = (data) => {
    loginGoogle(data)
      .then((res) => {
        setError(" ");
        setUser(res.data.userId);
        setToken("goalTracker");
        localStorage.setItem("email", res.data.email);
        localStorage.setItem("userId", res.data.userId);
        localStorage.setItem("token", "goalTrackerToken");
        localStorage.setItem("login", new Date());
        navigate("/");
        return;
      })
      .catch((res) => {
        loginError(res.response.data);
      });
  };

  const signUpAction = async (data) => {
    signUp(data.email, data.password)
      .then((res) => {
        setError(" ");
        setUser(res.data.userId);
        setToken("goalTracker");
        localStorage.setItem("email", res.data.email);
        localStorage.setItem("userId", res.data.userId);
        localStorage.setItem("token", "goalTrackerToken");
        localStorage.setItem("login", new Date());
        navigate("/");
        return;
      })
      .catch((res) => {
        loginError(res.response.data);
      });
  };

  const signUpGoogleAction = async (data) => {
    signUpGoogle(data)
      .then((res) => {
        setError(" ");
        setUser(res.data.userId);
        setToken("goalTracker");
        localStorage.setItem("email", res.data.email);
        localStorage.setItem("userId", res.data.userId);
        localStorage.setItem("token", "goalTrackerToken");
        localStorage.setItem("login", new Date());
        navigate("/");
        return;
      })
      .catch((res) => {
        loginError(res.response.data);
      });
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const loginError = (msg) => {
    setError(msg);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        error,
        loginAction,
        logOut,
        signUpAction,
        signUpGoogleAction,
        loginGoogleAction,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
