import styles from "../styles/StaffItem.module.css";
import { FaUserCircle } from "react-icons/fa";
import { RiMessage3Line, RiDeleteBin2Fill, RiEdit2Fill } from "react-icons/ri";

export default function StaffItem({ staff }) {
  const roleLegend = {
    medical_monitor: "Medical Monitor",
    admin: "Admin",
  };
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <FaUserCircle
          size={80}
          color="#C7C7CC"
          className={styles.iconContainer}
        />
        <div className={styles.roleContainer}>
          <h7 className={styles.roleText}>{roleLegend[staff?.role]}</h7>
        </div>
      </div>

      <p
        className={styles.staffName}
      >{`${staff.firstName} ${staff.lastName}`}</p>

      <div className={styles.actionsButton}>
        <button className={styles.buttonMessage}>
          <RiMessage3Line size={30} color={"white"} />
        </button>
        <button className={styles.buttonEdit}>
          <RiEdit2Fill size={30} color={"white"} />
        </button>
      </div>
    </div>
  );
}
