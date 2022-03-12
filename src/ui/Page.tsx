import { FC } from "react";
import Footnote from "../components/Footnote";
import styles from "./Page.module.css";
const Page: FC = (props) => {
  return (
    <div className={styles["page"]}>
      {props.children} <Footnote />
    </div>
  );
};

export default Page;
