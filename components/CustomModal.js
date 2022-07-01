import { Modal, Button } from "react-bootstrap";
import styles from "../styles/CustomModal.module.css";
export default function CustomModal({
  visible,
  handleClose,
  handleSubmit,
  title,
  body,
}) {
  return (
    <Modal show={visible} onHide={handleClose} animation={true}>
      <Modal.Header className={styles.container}>
        <Modal.Title className={styles.headerText}>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button className="buttonCancel" onClick={handleClose}>
          Close
        </Button>
        <Button className="buttonPrimary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
