import { DashboardItem } from "../components";
import styles from "../styles/Home.module.css";
import { TbNotes } from "react-icons/tb";
import { BsJournalMedical } from "react-icons/bs";
import { FaRegHandshake } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import { BsChatLeftDotsFill } from "react-icons/bs";

export default function Home() {
  return (
    <div className={styles.container}>
      <DashboardItem
        title={"Protocol"}
        icon={<BsJournalMedical size={50} color="#5AC8FA" />}
        path="/protocols"
      />
      <DashboardItem
        title={"Sponsors"}
        icon={<FaRegHandshake size={50} color="#5AC8FA" />}
        path="/sponsors"
      />
      <DashboardItem
        title={"Sites"}
        icon={<MdLocationPin size={50} color="#5AC8FA" />}
        path="/sites"
      />
      <DashboardItem
        title={"Messages"}
        icon={<BsChatLeftDotsFill size={50} color="#5AC8FA" />}
        path="/messages"
      />
    </div>
  );
}
