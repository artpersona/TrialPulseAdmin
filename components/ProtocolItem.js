import styles from "../styles/Protocols.module.css";
import { CgFileDocument } from "react-icons/cg";
import { useRouter } from "next/router";
export default function ProtocolItem({ data }) {
  const router = useRouter();
  return (
    <div className={styles.item__container}>
      <div className={styles.green__container}>
        <h7 className={styles.item__text}>Active</h7>
      </div>

      <div className={styles.main__container}>
        <div className={styles.details__container}>
          <p className={styles.title__text}>{data?.name}</p>
          <div className={styles.form__row}>
            <p className={styles.form__label}>Sponsor: </p>
            <p className={styles.form__value}>{data?.sponsor_name}</p>
          </div>

          <div className={styles.form__row}>
            <p className={styles.form__label}>Sites: </p>
            <p className={styles.form__value}>Johns Hopkins Hospital</p>
          </div>
        </div>

        <div
          className={styles.button__container}
          onClick={() => router.push(`/trial/AZ-ID 1`)}
        >
          <CgFileDocument size={45} color={"white"} />
        </div>
      </div>
    </div>
  );
}
