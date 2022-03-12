import { FC, Fragment } from "react";
import ReactDOM from "react-dom";
import Modal from "./Modal";
import styles from "./OverlayModal.module.css";

const OverlayModal: FC<{ onClose?: () => void }> = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <div className={styles["backdrop"]} onClick={props.onClose} />,
        document.getElementById("overlays")!
      )}
      {ReactDOM.createPortal(
        <Modal overlay={true}>{props.children}</Modal>,
        document.getElementById("overlays")!
      )}
    </Fragment>
  );
};

export default OverlayModal;
