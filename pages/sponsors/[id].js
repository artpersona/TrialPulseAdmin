import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/Sponsors.module.css";
import { InputGroup, FormControl } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { ProtocolItem, StaffItem, Empty } from "../../components";
import { useSponsorContext } from "../../shared/contexts/SponsorsContext";
export default function Sponsor() {
  const router = useRouter();
  const id = router.query.id;
  const { getSpecificSponsor, getSpecificSponsorProtocols } =
    useSponsorContext();
  const [data, setData] = useState(null);
  const [protocols, setProtocols] = useState(null);

  useEffect(() => {
    setData(getSpecificSponsor(id));
    setProtocols(getSpecificSponsorProtocols(id));
  }, [id]);

  return (
    <div className={styles.container}>
      <div className="pageTitle__container">
        <p className="pageTitle">{data?.name}</p>
      </div>

      <div className={styles.main__content}>
        <div className={styles.staffContainer}>
          <p className={styles.headerTitle}>Staff</p>

          <div className={styles.header}>
            <button
              className="buttonPrimary"
              onClick={() => setAddModalShow(true)}
            >
              Add Staff
            </button>
            <InputGroup className="w-75">
              <FormControl
                placeholder="Search staffs"
                aria-label="Username"
                aria-describedby="basic-addon1"
                className="py-2"
              />
              <InputGroup.Text>
                <BsSearch size={25} color={"#FF9500"} />
              </InputGroup.Text>
            </InputGroup>
          </div>

          <div className={styles.staff__content__container}>
            {data?.staffs?.map((staff) => {
              return <StaffItem key={staff.id} staff={staff} />;
            })}
          </div>

          {!data?.staffs?.length && <Empty name={"staff"} />}
        </div>
        <div className={styles.protocolContainer}>
          <p className={styles.headerTitle}>Protocols</p>
          <div className={styles.header}>
            <button
              className="buttonPrimary"
              onClick={() => setAddModalShow(true)}
            >
              Add Protocol
            </button>
            <InputGroup className="w-75">
              <FormControl
                placeholder="Search protocols"
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
            {protocols &&
              protocols.map((protocol) => {
                return <ProtocolItem key={protocol.id} data={protocol} />;
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
