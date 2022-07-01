import { PageHeader, Footer } from "../components";
import styles from "../styles/Layout.module.css";
export default function Layout({ children }) {
  return (
    <>
      <PageHeader />
      <main className={styles.background}>
        <div
          // className="shadow-lg bg-red rounded w-50 mw-auto mx-auto py-5 my-3"
          className={styles.container}
          // style={{ backgroundColor: "blue", width: "" }}
        >
          <div className={styles.wrapper}>{children}</div>
        </div>
      </main>
      <Footer />
    </>
  );
}
