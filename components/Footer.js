import styles from "../styles/Footer.module.css";

export default function Footer() {
  return (
    <footer>
      <div className="flex-shrink-0 py-3 bg-dark text-white-50">
        <p className={styles.footer__text}>Trial Pulse ©2022</p>
      </div>
    </footer>
  );
}
