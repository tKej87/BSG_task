import { FC } from "react";
import styles from "./Input.module.css";

const Input: FC<{
  id: string;
  label: string;
  icon: JSX.Element;
  onChange: (value: string) => void;
  value?: string;
}> = (props) => {
  const onChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    props.onChange(event.currentTarget.value);
  };

  return (
    <div className={styles["control-group"]}>
      <label className={styles["control-group__label"]} htmlFor={props.id}>
        {props.label}
      </label>
      <div className={styles["control-group__insert"]}>
        <span className={styles["control-group__icon"]}>{props.icon}</span>
        <input
          id={props.id}
          type={props.id}
          onChange={onChangeHandler}
          className={styles["control-group__input"]}
          value={props.value}
        />
      </div>
    </div>
  );
};
export default Input;
