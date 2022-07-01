import styles from "../styles/CustomSwitch.module.css";
export default function CustomSwitch({
  activeValue,
  value1,
  value2,
  setActiveValue,
}) {
  return (
    <div className={styles.switch__container}>
      <div
        className={
          activeValue === value1
            ? [styles.switch__item, styles.item__active].join(" ")
            : styles.switch__item
        }
      >
        <h7
          className={
            activeValue === value1
              ? [styles.switch__text, styles.text__active].join(" ")
              : styles.switch__text
          }
          onClick={() => setActiveValue(value1)}
        >
          {value1}
        </h7>
      </div>
      <div
        className={
          activeValue === value2
            ? [styles.switch__item, styles.item__active].join(" ")
            : styles.switch__item
        }
      >
        <h7
          className={
            activeValue === value2
              ? [styles.switch__text, styles.text__active].join(" ")
              : styles.switch__text
          }
          onClick={() => setActiveValue(value2)}
        >
          {value2}
        </h7>
      </div>
    </div>
  );
}
