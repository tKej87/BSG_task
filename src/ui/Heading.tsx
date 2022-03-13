import { FC } from "react";
import styles from "./Heading.module.css";

const Heading: FC<{
  type?: "main" | "category" | "movie-title";
  text: string;
  onClick?: () => void;
}> = (props) => {
  const mainHeadingClass = props.type && styles[`heading_${props.type}`];
  const headingClickable = props.onClick && styles[`heading_clickable`];
  return (
    <p
      className={`${styles["heading"]} ${mainHeadingClass} ${headingClickable}`}
      onClick={props.onClick}
    >
      {props.text}
    </p>
  );
};

export default Heading;
