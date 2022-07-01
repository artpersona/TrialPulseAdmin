import styles from "../styles/StaffItem.module.css";
import { FaUserCircle } from "react-icons/fa";
import { RiMessage3Line, RiDeleteBin2Fill } from "react-icons/ri";

export default function StaffItem(second) {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <FaUserCircle
          size={80}
          color="#C7C7CC"
          className={styles.iconContainer}
        />
        <div className={styles.roleContainer}>
          <h7 className={styles.roleText}>Admin</h7>
        </div>
      </div>

      <p className={styles.staffName}>Rosanna Rivera</p>

      <div className={styles.actionsButton}>
        <button className={styles.buttonEdit}>
          <RiMessage3Line size={30} color={"white"} />
        </button>
        <button className={styles.buttonDelete}>
          <RiDeleteBin2Fill size={30} color={"white"} />
        </button>
      </div>
    </div>
  );
}
