import styles from "../styles/SiteInfo.module.css";
import { Form, Button } from "react-bootstrap";
export default function SiteInfo() {
  return (
    <div className={styles.site__container}>
      <h7 className={styles.title__text}>Site Info</h7>

      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className={styles.label__text}>Site Name</Form.Label>
          <Form.Control type="text" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className={styles.label__text}>Address</Form.Label>
          <Form.Control type="text" placeholder="Password" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className={styles.label__text}>City</Form.Label>
          <Form.Control type="text" placeholder="Password" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className={styles.label__text}>
            State / Province
          </Form.Label>
          <Form.Control type="text" placeholder="Password" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className={styles.label__text}>Zip Code</Form.Label>
          <Form.Control type="text" placeholder="Password" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className={styles.label__text}>Country</Form.Label>
          <Form.Control type="text" placeholder="Password" />
        </Form.Group>
      </Form>
    </div>
  );
}
