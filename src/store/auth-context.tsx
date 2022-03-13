import React, { FC, useState } from "react";

interface Auth {
  name: string;
  token: string;
  isGuest: boolean;
  isLoggedIn: boolean;
  logIn: (name: string, token: string) => void;
  logOut: () => void;
  logInGuest: () => void;
}

export const AuthContext = React.createContext<Auth>({
  name: "",
  token: "",
  isGuest: false,
  isLoggedIn: false,
  logIn: () => {},
  logOut: () => {},
  logInGuest: () => {},
});

const getStoredAuthData: () => { name: string; token: string } = () => {
  const storedToken = sessionStorage.getItem("token") ?? "";
  const name = sessionStorage.getItem("name") ?? "";
  return { token: storedToken, name: name };
};

const AuthContextProvider: FC = (props) => {
  const storedAuthData = getStoredAuthData();
  const initialToken = storedAuthData ? storedAuthData.token : "";
  const initialUserName = storedAuthData ? storedAuthData.name : "";

  const [token, setToken] = useState<string>(initialToken);
  const [name, setUserName] = useState<string>(initialUserName);
  const [guest, setGuest] = useState<boolean>(false);

  const logInHandler = (name: string, token: string) => {
    setToken(token);
    setUserName(name);
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("name", name);
  };
  const logOutHandler = () => {
    setToken("");
    setUserName("");
    setGuest(false);
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("name");
  };
  const isLoggedIn = !!token;

  const loginGuestHandler = () => {
    setGuest(true);
  };

  const contextValue = {
    name,
    token,
    isGuest: guest,
    isLoggedIn,
    logIn: logInHandler,
    logOut: logOutHandler,
    logInGuest: loginGuestHandler,
  };

  return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
};

export default AuthContextProvider;
