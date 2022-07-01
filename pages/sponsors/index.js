import React, { useState } from "react";
import styles from "../../styles/Sponsors.module.css";
import { InputGroup, FormControl } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { SponsorItem, CustomModal } from "../../components";
import { useRouter } from "next/router";
import { useSponsorContext } from "../../shared/contexts/SponsorsContext";

export default function Sponsors() {
  const { sponsors, addSponsor } = useSponsorContext();
  const router = useRouter();
  const [addModalShow, setAddModalShow] = useState(false);
  const [sponsorName, setSponsorName] = useState("");

  const handleSubmit = () => {
    addSponsor({ sponsorName })
      .then((data) => {
        router.push(`/sponsors/${data}`);
      })
      .catch((err) => {
        console.log("err is: ", err);
      });
    setAddModalShow(false);
  };

  return (
    <div className={styles.container}>
      <div className="pageTitle__container">
        <p className="pageTitle">Sponsors</p>
      </div>
      <div className={styles.header}>
        <button className="buttonPrimary" onClick={() => setAddModalShow(true)}>
          Add Sponsor
        </button>
        <InputGroup className="w-75">
          <FormControl
            placeholder="Search sponsor"
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
        {sponsors?.map((item) => {
          return (
            <SponsorItem
              key={item.id}
              name={item.name}
              onPress={() => router.push(`/sponsors/${item.id}`)}
            />
          );
        })}
      </div>

      <CustomModal
        visible={addModalShow}
        handleClose={() => setAddModalShow(false)}
        title="Add Sponsor"
        body={
          <FormControl
            placeholder="Enter Sponsor Name"
            aria-label="Username"
            aria-describedby="basic-addon1"
            className="py-2"
            onChange={(e) => setSponsorName(e.target.value)}
          />
        }
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
