import styles from "../../styles/Sites.module.css";
import { InputGroup, FormControl } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { SponsorItem } from "../../components";
import { useRouter } from "next/router";

export default function Sites() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className="pageTitle__container">
        <p className="pageTitle">Sites</p>
      </div>

      <div className={styles.header}>
        <button className="buttonPrimary">Add Site</button>
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
        <SponsorItem
          name="Cleveland Clinic"
          onPress={() => router.push(`/sites/Cleveland Clinic`)}
        />
        <SponsorItem
          name="Douglas State University Hospital"
          onPress={() =>
            router.push(`/sites/Douglas State University Hospital`)
          }
        />
        <SponsorItem
          name="Franklin State University Hospital"
          onPress={() =>
            router.push(`/sites/Franklin State University Hospital`)
          }
        />
      </div>
    </div>
  );
}
