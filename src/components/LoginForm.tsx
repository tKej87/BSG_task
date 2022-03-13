import { FC, useState, Fragment, useContext } from "react";
import Input from "../ui/Input";
import styles from "./LoginForm.module.css";
import { emailIcon, passwordIcon } from "../icons/Icons";
import Heading from "../ui/Heading";
import useHttp from "../hooks/useHttp";
import { AuthContext } from "../store/auth-context";
import { useNavigate } from "react-router-dom";
import ErrorMsg from "../ui/ErrorMsg";

interface RequestObject {
  url: string;
  headers: {};
  data: {
    Username?: string;
    Password?: string;
    Device: { PlatformCode: string; Name: string };
  };
}
interface ResponseData {
  User: {
    Products?: [];
    Id: number;
    FullName: string;
    Email?: string;
    Initials?: string;
    ClientRoles: [];
    UserName?: string;
  };
  AuthorizationToken: { Token: string; TokenExpires: string; RefreshToken?: string };
}

const LoginForm: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const authCtx = useContext(AuthContext);
  const httpRequest = useHttp();
  const apiRequest = httpRequest.apiRequest;
  const navigate = useNavigate();
  const deviceName = "12345678-1234-1234-1234-123456789012";

  const nameHandler = (value: string) => {
    setEmail(value);
  };
  const passwordHandler = (value: string) => {
    setPassword(value);
  };

  const requestData =
    email && password
      ? { Username: email, Password: password, Device: { PlatformCode: "WEB", Name: deviceName } }
      : { Device: { PlatformCode: "WEB", Name: deviceName } };

  const successHandler = (data: ResponseData) => {
    authCtx.logIn(data.User.FullName, data.AuthorizationToken.Token);
    navigate("/home");
  };
  const errorHandler = (error: Error) => {
    setErrorMsg(JSON.stringify(error.message));
  };

  const request: RequestObject = {
    url: "Authorization/SignIn",
    headers: { "Content-Type": "application/json" },
    data: requestData,
  };

  const loginGuestHandler = () => {
    apiRequest(request, successHandler, errorHandler);
    authCtx.logInGuest();
    setPassword("");
  };

  const loginRegisteredHandler = () => {
    apiRequest(request, successHandler, errorHandler);
    setPassword("");
  };
  const formIsValid = email && password;

  const activeBtnClass = formIsValid && styles["control-group__btn_active"];

  return (
    <Fragment>
      {errorMsg && <ErrorMsg message={errorMsg} />}
      <Heading text="Log in as Registered User" />
      <div className={styles["control-group"]}>
        <Input id="email" label="e-mail" onChange={nameHandler} icon={emailIcon} value={email} />
        <Input
          id="password"
          label="password"
          onChange={passwordHandler}
          icon={passwordIcon}
          value={password}
        />
        <div className={`${styles["control-group__btn"]} ${activeBtnClass}`}>
          <button disabled={!formIsValid} onClick={loginRegisteredHandler}>
            log in
          </button>
        </div>
      </div>
      <Heading text="or continue as Guest" onClick={loginGuestHandler} />
    </Fragment>
  );
};

export default LoginForm;
