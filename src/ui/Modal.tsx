import { FC } from "react";

import styles from "./Modal.module.css";

const Modal: FC<{ onClose?: () => void; overlay?: boolean }> = (props) => {
  const overlayClass = `${styles["modal"]} ${props.overlay && styles["modal_overlay"]}`;

  return <div className={overlayClass}>{props.children}</div>;
};

export default Modal;
