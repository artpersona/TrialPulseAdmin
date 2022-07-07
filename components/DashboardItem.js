import styles from "../styles/DashboardItem.module.css";
import { BsChevronRight } from "react-icons/bs";
import Link from "next/link";
export default function DashboardItem({ title, icon, path }) {
  console.log("path is: ", path);

  return (
    <Link href={path}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.left}>
            {icon}

            <p className={styles.title__text}>{title}</p>
          </div>
          <BsChevronRight size={40} color={"#FF9500"} />
        </div>
      </div>
    </Link>
  );
}
