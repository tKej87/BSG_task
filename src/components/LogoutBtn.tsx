import { FC, useContext } from "react";
import { useNavigate } from "react-router";
import { logoutIcon } from "../icons/Icons";
import { AuthContext } from "../store/auth-context";
import styles from "./LogoutBtn.module.css";

const LogoutBtn: FC = (props) => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    authCtx.logOut();
    navigate("/");
  };
  return (
    <div className={styles["control-group"]}>
      {props.children}
      <span className={styles["control-group__button"]} onClick={logoutHandler}>
        {logoutIcon}
      </span>
    </div>
  );
};

export default LogoutBtn;
