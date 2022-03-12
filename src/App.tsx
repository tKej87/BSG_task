import "./App.css";
import HomePage from "./pages/HomePage";
import SplashPage from "./pages/SplashPage";
import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./store/auth-context";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <Routes>
      <Route path="/" element={<SplashPage />} />
      {authCtx.isLoggedIn && <Route path="/home" element={<HomePage />} />}
      <Route path="/*" element={<Navigate to={authCtx.isLoggedIn ? "/home" : "./"} />} />
    </Routes>
  );
}

export default App;
