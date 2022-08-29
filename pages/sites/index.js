import styles from "../../styles/Sites.module.css";
import { InputGroup, FormControl } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { SponsorItem, CustomModal } from "../../components";
import { useRouter } from "next/router";
import { useSiteContext } from "../../shared/contexts/SitesContext";
export default function Sites() {
  const { sites } = useSiteContext();
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className="pageTitle__container">
        <p className="pageTitle">Sites</p>
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
        {sites.map((site, index) => (
          <SponsorItem
            data={{ name: site.name }}
            onPress={() => router.push(`/sites/${site.id}`)}
            key={index.toString()}
          />
        ))}
      </div>
    </div>
  );
}
