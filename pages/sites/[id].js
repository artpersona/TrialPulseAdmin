import React, { useState } from "react";
import {
  CustomSwitch,
  SiteInfo,
  StaffItem,
  ProtocolItem,
} from "../../components";
import styles from "../../styles/Sites.module.css";
import { InputGroup, FormControl } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
function IndividualSite() {
  const [activeValue, setActiveValue] = useState("Info");
  return (
    <div>
      <div className="pageTitle__container">
        <p className="pageTitle">Sponsors</p>
      </div>

      <div className={styles.sites__container}>
        <CustomSwitch
          activeValue={activeValue}
          value1="Info"
          value2="Assigned"
          setActiveValue={setActiveValue}
        />

        {activeValue === "Info" ? (
          <SiteInfo />
        ) : (
          <div className={styles.main__content}>
            <div className={styles.staffContainer}>
              <p className={styles.headerTitle}>Physicians</p>

              <div className={styles.header}>
                <button
                  className="buttonPrimary"
                  onClick={() => setAddModalShow(true)}
                >
                  Add Physicians
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
                <StaffItem />
                <StaffItem />
                <StaffItem />
              </div>
            </div>
            <div className={styles.protocolContainer}>
              <p className={styles.headerTitle}>Protocols</p>
              <div
                className={[styles.header, styles.centered__header].join(" ")}
              >
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
                <ProtocolItem name="Cleveland Clinic" />
                <ProtocolItem name="Cleveland Clinic" />
                <ProtocolItem name="Cleveland Clinic" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default IndividualSite;
