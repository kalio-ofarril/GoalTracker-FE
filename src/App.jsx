import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import "./App.css";

import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import SignUp from "./pages/SignUp/SignUp";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile/Profile";
import AuthProvider from "./hooks/AuthProvider";
import PrivateRoute from "./utils/PrivateRoute";
import Login from "./pages/Login/Login";

function App() {
  return (
    <GoogleOAuthProvider clientId="804166899931-r8b6q1k4h1c9mhtdg3jau1pdpf7sqm83.apps.googleusercontent.com">
      <BrowserRouter>
        <AuthProvider>
          <div className="header">
            <Header />
          </div>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Home />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
