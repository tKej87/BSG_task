import { FC } from "react";
import styles from "./ErrorMsg.module.css";

const ErrorMsg: FC<{
  message: string;
}> = (props) => {
  return <p className={`${styles["message"]}`}>{props.message}</p>;
};

export default ErrorMsg;
