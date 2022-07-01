import styles from "../styles/Protocols.module.css";
import { InputGroup, FormControl } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { ProtocolItem } from "../components";
export default function Sites() {
  return (
    <div className={styles.container}>
      <div className="pageTitle__container">
        <p className="pageTitle">Protocols</p>
      </div>

      <div className={styles.header}>
        <InputGroup className="w-75">
          <FormControl
            placeholder="Search site"
            aria-label="Username"
            aria-describedby="basic-addon1"
            className="py-2"
          />
          <InputGroup.Text>
            <BsSearch size={25} color={"#FF9500"} />
          </InputGroup.Text>
        </InputGroup>
      </div>

      <div className={styles.content__container}>
        <ProtocolItem name="Cleveland Clinic" />
        <ProtocolItem name="Cleveland Clinic" />

        <ProtocolItem name="Cleveland Clinic" />
      </div>
    </div>
  );
}
