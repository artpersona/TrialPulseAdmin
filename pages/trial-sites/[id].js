import React, { useState, useEffect } from "react";
import styles from "../../styles/Trial.module.css";
import { Form, Tabs, Tab, Button } from "react-bootstrap";
import { useRouter } from "next/router";

import DataTable from "react-data-table-component";
import { BiCog } from "react-icons/bi";
export default function IndividualTrial() {
  const router = useRouter();
  const id = router?.query?.id;

  console.log(router?.query?.trial_id);
  console.log(router?.query?.site_id);
  //   const { trialStatus } = useAppContext();
  //   const { sites } = useSiteContext();
  const [trialData, setTrialData] = useState([]);

  return (
    <div className={styles.container}>
      <div className={styles.trial__container}>
        <h7 className={styles.trial__title}>Trial Site Assignment</h7>
      </div>

      <div className={styles.trialSite__details}></div>

      <div className={styles.section__panel}>
        <div className={styles.panel__header}>Trial Site Overview</div>
        <div className={styles.panel__content}>
          <div className={styles.panel__wrapper}>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Trial Title</Form.Label>
                <Form.Control
                  type="title"
                  placeholder="Enter title"
                  defaultValue={trialData?.name}
                  onChange={(e) =>
                    setTrialData({ ...trialData, name: e.target.value })
                  }
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Trial Status</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  value={trialData.trial_status}
                  onChange={(e) =>
                    setTrialData({ ...trialData, trial_status: e.target.value })
                  }
                ></Form.Select>
              </Form.Group>

              <Button className="buttonPrimary">Save Changes</Button>
            </Form>
          </div>
        </div>
      </div>

      <div className={styles.section__panel}>
        <div className={styles.panel__header}>Eligibility Criterias</div>
        {/* <Form className={styles.panel__content}>
          <div className={styles.panel__wrapper}>
            {trialData?.trial_settings?.map((item, index) => {
              return (
                <div className={styles.radio__container} key={index.toString()}>
                  <p className={styles.radio__label}>{item?.title}</p>
                  <div key={`inline-radio`} className="mb-3">
                    <Form.Check
                      inline
                      label="Yes"
                      name={item?.id}
                      type={"radio"}
                      id={`inline-radio-1`}
                      onChange={() => handleSettingChange(item.id, true)}
                      checked={item.value}
                    />
                    <Form.Check
                      inline
                      label="No"
                      name={item?.id}
                      type={"radio"}
                      id={`inline-radio-2`}
                      onChange={() => handleSettingChange(item.id, false)}
                      checked={!item.value}
                    />
                  </div>
                </div>
              );
            })}

            <Button className="buttonPrimary" onClick={handleSubmit}>
              Save Changes
            </Button>
          </div>
        </Form> */}
      </div>

      <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="sites" title="Principal Investigators"></Tab>
        <Tab eventKey="docs" title="Sub Investigator"></Tab>
        <Tab eventKey="sites" title="Principal Investigators"></Tab>
      </Tabs>
    </div>
  );
}
