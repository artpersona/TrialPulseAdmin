import { PageHeader, Footer } from "../components";
import styles from "../styles/Layout.module.css";
export default function Layout({ children }) {
  return (
    <div className="flex flex-col justify-between h-full w-full">
      <PageHeader className="grow-0"/>
      <div className="grow h-full w-full">{children}</div>
      <Footer className="grow-0"/>
    </div>
  );
}
