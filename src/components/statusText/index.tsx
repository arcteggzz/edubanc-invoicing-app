import styles from "./StatusText.module.scss";
import { capitalizeFirstLetter } from "../../utils";

export type StatusTextProps = {
  text: "completed" | "pending" | "late";
};

const StatusText = ({ text }: StatusTextProps) => {
  const style = {
    color:
      text === "completed"
        ? "green"
        : text === "pending"
        ? "orange"
        : text === "late"
        ? "red"
        : "black",
  };

  return (
    <>
      <h5 className={styles.StatusText} style={style}>
        {capitalizeFirstLetter(text)}
      </h5>
    </>
  );
};

export default StatusText;
