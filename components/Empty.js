import styles from "../styles/Miscs.module.css";
export default function Empty({ name }) {
  return (
    <div className={styles.empty__container}>
      <h7 className={styles.empty__text}>No {name} listed</h7>
    </div>
  );
}
