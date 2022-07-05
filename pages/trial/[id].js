import React, { useState, useEffect } from "react";
import styles from "../../styles/Trial.module.css";
import { Form, Tabs, Tab, Button } from "react-bootstrap";
import { MDBDataTableV5 } from "mdbreact";
import { useRouter } from "next/router";
import { useProtocolContext } from "../../shared/contexts/ProtocolContext";
import { useSiteContext } from "../../shared/contexts/SitesContext";
import { useAppContext } from "../../shared/contexts/AppContext";
import { CustomModal } from "../../components";
export default function IndividualTrial() {
  const router = useRouter();
  const id = router?.query?.id;
  const { findProtocol, updateProtocol } = useProtocolContext();
  const { trialStatus } = useAppContext();
  const { sites } = useSiteContext();
  const [trialData, setTrialData] = useState([]);

  const [addSiteModal, setAddSiteModal] = useState(false);

  const [availableSites, setAvailableSites] = useState([]);

  const [datatable, setDatatable] = React.useState({
    columns: [
      {
        label: "Site",
        field: "name",
        width: 250,
      },
      {
        label: "Assigned",
        field: "assignedDate",
        width: 250,
      },
      {
        label: "Actions",
        width: 200,
      },
    ],
    rows: [{ name: "St. Mary Hopkins Hospital", assignedDate: "July 5, 2022" }],
  });

  console.log("sites are: ", sites);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProtocol(trialData);
  };

  const handleSettingChange = (id, value) => {
    let tempTrialSettings = trialData.trial_settings;
    tempTrialSettings = tempTrialSettings.map((item) => {
      if (item.id === id) item.value = value;
      return item;
    });
    let tempData = { ...trialData };
    tempData.trial_settings = tempTrialSettings;
    setTrialData(tempData);
  };

  useEffect(() => {
    if (router?.query?.id) setTrialData(findProtocol(id));
  }, [router.query]);

  useEffect(() => {
    let existingSites = [];
    if (trialData?.trial_stes) {
      existingSites = trialData.trial_sites.map((item) => {
        return item.id;
      });
    }
    let displayedSites = [...sites];
    displayedSites = displayedSites.filter(
      (item) => !existingSites.includes(item.id)
    );
    setAvailableSites(displayedSites);
  }, [trialData]);

  return (
    <div className={styles.container}>
      <div className={styles.trial__container}>
        <h7 className={styles.trial__title}>{trialData.name}</h7>
        <a className={styles.trial__subtitle}>{trialData?.sponsor?.name}</a>
      </div>

      <div className={styles.section__panel}>
        <div className={styles.panel__header}>Trial Overview</div>
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
                >
                  {trialStatus?.map((status) => {
                    return (
                      <option key={status.id} value={status.id}>
                        {status.title}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>

              <Button className="buttonPrimary" onClick={handleSubmit}>
                Save Changes
              </Button>
            </Form>
          </div>
        </div>
      </div>

      <div className={styles.section__panel}>
        <div className={styles.panel__header}>Trial Setting</div>
        <Form className={styles.panel__content}>
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
        </Form>
      </div>

      <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="sites" title="Sites">
          <Button
            className="buttonPrimary"
            onClick={() => setAddSiteModal(true)}
            style={{ marginBottom: "2%" }}
          >
            Assign Site
          </Button>

          <MDBDataTableV5
            hover
            entriesOptions={[5, 20, 25]}
            entries={5}
            pagesAmount={4}
            data={datatable}
            searchTop
            searchBottom={false}
          />
        </Tab>
        <Tab eventKey="docs" title="Conset Documents">
          <Button
            className="buttonPrimary"
            onClick={handleSubmit}
            style={{ marginBottom: "2%" }}
          >
            Upload Consent Document
          </Button>
          <MDBDataTableV5
            hover
            entriesOptions={[5, 20, 25]}
            entries={5}
            pagesAmount={4}
            data={datatable}
            searchTop
            searchBottom={false}
          />
        </Tab>
      </Tabs>

      <CustomModal
        visible={addSiteModal}
        handleClose={() => setAddSiteModal(false)}
        title="Assign Site"
        body={
          <Form.Select
            aria-label="Default select example"
            value={trialData.trial_status}
            onChange={(e) =>
              setTrialData({ ...trialData, trial_status: e.target.value })
            }
          >
            {availableSites.map((status) => {
              return (
                <option key={status.id} value={status.id}>
                  {status.name}
                </option>
              );
            })}
          </Form.Select>
        }
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
