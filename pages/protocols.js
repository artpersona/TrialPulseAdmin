import styles from "../styles/Protocols.module.css";
import { InputGroup, FormControl } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { ProtocolItem, Empty } from "../components";
import { useProtocolContext } from "../shared/contexts/ProtocolContext";
export default function Sites() {
  const { protocols } = useProtocolContext();
  return (
    <div className={styles.container}>
      <div className="pageTitle__container">
        <p className="pageTitle">Protocols</p>
      </div>

      <div className={styles.header}>
        <InputGroup className="w-75">
          <FormControl
            placeholder="Search protocol"
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
        {protocols.map((item) => {
          return <ProtocolItem key={item.id} data={item} />;
        })}
      </div>
    </div>
  );
}
