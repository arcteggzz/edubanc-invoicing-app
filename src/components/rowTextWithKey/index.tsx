import styles from "./RowTextWithKey.module.scss";
import { capitalizeFirstLetter } from "../../utils";

type RowTextWithKeyProps = {
  identifier?: string;
  value?: string;
  marginBottom?: string;
  fontSize?: string;
  fontWeight?: string;
  valueFontSize?: string;
  valueFontWeight?: string;
};

const RowTextWithKey = ({
  identifier = `info`,
  value = `null`,
  marginBottom = `2px`,
  fontSize = `8px`,
  fontWeight = `500`,
  valueFontSize = `8px`,
  valueFontWeight = `700`,
}: RowTextWithKeyProps) => {
  const style = {
    marginBottom,
    fontSize,
    fontWeight,
  };

  const spanStyle = {
    fontSize: valueFontSize,
    fontWeight: valueFontWeight,
  };

  return (
    <>
      <h5 className={styles.RowTextWithKey} style={style}>
        {`${capitalizeFirstLetter(identifier)}`}
        <span style={spanStyle}>{`${capitalizeFirstLetter(value)}`}</span>
      </h5>
    </>
  );
};

export default RowTextWithKey;
