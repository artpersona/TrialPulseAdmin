import styles from "../styles/SponsorItem.module.css";
import { RiEditBoxLine, RiDeleteBin2Fill } from "react-icons/ri";

export default function SponsorItem({ name, onPress }) {
  return (
    <div className={styles.item__container}>
      <h7 className={styles.centered__text}>{name}</h7>

      <div className={styles.buttons__container}>
        <button className={styles.buttonEdit} onClick={onPress}>
          <RiEditBoxLine size={25} color={"white"} />
        </button>
        <button className={styles.buttonDelete}>
          <RiDeleteBin2Fill size={25} color={"white"} />
        </button>
      </div>
    </div>
  );
}
