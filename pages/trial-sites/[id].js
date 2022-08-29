import React, { useState, useEffect } from "react";
import styles from "../../styles/Trial.module.css";
import {
  Form,
  Tabs,
  Tab,
  Button,
  FormGroup,
  FormLabel,
  FormControl,
} from "react-bootstrap";
import { useRouter } from "next/router";
import { useProtocolContext } from "../../shared/contexts/ProtocolContext";
import DataTable from "react-data-table-component";
import { CustomModal } from "../../components";
import { GrFormClose } from "react-icons/gr";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function IndividualTrial() {
  const { fetchTrialSite, updateTrialSite, deleteTrialInfo } =
    useProtocolContext();
  const router = useRouter();

  const [trialData, setTrialData] = useState([]);
  const [protocolID, setProtocolID] = useState(null);
  const [siteID, setSiteID] = useState(null);
  // Protocol Information
  const [adminIssues, setAdminIssues] = useState([]);
  const [studyInformations, setStudyInformations] = useState([]);
  const [studyInformationData, setStudyInformationData] = useState({
    title: "",
    body: "",
  });
  const [adminIssuesData, setAdminIssuesData] = useState({
    name: "",
    body: "",
  });
  // Eligibility Criterias
  const [eligibilityCriterias, setEligibilityCriterias] = useState([]);
  const [eligibilityCriteriaData, setEligibilityCriteriaData] = useState({
    name: "",
  });
  // Assigned Staffs
  const [assignedStaffs, setAssignedStaffs] = useState([]);

  const [studyInformationModal, setStudyInformationModal] = useState(false);
  const [adminIssuesModal, setAdminIssuesModal] = useState(false);
  const [eligibilityCriteriasModal, setEligibilityCriteriasModal] =
    useState(false);

  // Columns
  const studyInformationColumns = [
    {
      name: "Title",
      selector: (row) => row.title,
    },
    {
      name: "Body",
      selector: (row) => row.body,
    },
    {
      cell: (row) => (
        <button
          id={row.id}
          onClick={(e) => {
            e.preventDefault();
            MySwal.fire({
              icon: "info",
              title: "Remove Study Information ?",
              showCancelButton: true,
              confirmButtonText: "Delete",
              confirmButtonColor: "#c73e1d",
              confirm,
            }).then((result) => {
              if (result.isConfirmed) {
                let path = `/study_informations/${row.id}`;
                deleteTrialInfo(protocolID, siteID, path)
                  .then(() => {
                    Swal.fire({
                      icon: "success",
                      title: "Information deleted successfully",
                    });
                    let newStudyInformation = [...studyInformations];
                    newStudyInformation = newStudyInformation.filter(
                      (item) => item.id !== row.id
                    );
                    setStudyInformations(newStudyInformation);
                  })
                  .catch((err) => alert("Error on deleting study information"));
              }
            });
          }}
        >
          <GrFormClose size={20} color="red" />
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      name: "Actions",
    },
  ];

  const adminIssuesColumns = [
    {
      name: "Title",
      selector: (row) => row.name,
    },
    {
      name: "Body",
      selector: (row) => row.body,
    },
    {
      cell: (row) => (
        <button
          id={row.id}
          onClick={(e) => {
            e.preventDefault();
            MySwal.fire({
              icon: "info",
              title: "Remove Admin Issue ?",
              showCancelButton: true,
              confirmButtonText: "Delete",
              confirmButtonColor: "#c73e1d",
              confirm,
            }).then((result) => {
              if (result.isConfirmed) {
                let path = `/admin_issues/${row.id}`;
                deleteTrialInfo(protocolID, siteID, path)
                  .then(() => {
                    Swal.fire({
                      icon: "success",
                      title: "Information deleted successfully",
                    });
                    let newAdminIssues = [...adminIssues];
                    newAdminIssues = newAdminIssues.filter(
                      (item) => item.id !== row.id
                    );
                    setAdminIssues(newAdminIssues);
                  })
                  .catch((err) => alert("Error on deleting admin issue"));
              }
            });
          }}
        >
          <GrFormClose size={20} color="red" />
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      name: "Actions",
    },
  ];

  const eligibilityCriteriasColumns = [
    {
      name: "Title",
      selector: (row) => row.name,
    },
    {
      name: "Status",
      selector: (row) => {
        if (row.exclusion) {
          return "Excluded";
        } else if (row.inclusion) {
          return "Included";
        } else {
          return "Not Used";
        }
      },
    },
    {
      cell: (row) => (
        <button
          id={row.id}
          onClick={(e) => {
            e.preventDefault();
            MySwal.fire({
              icon: "info",
              title: "Remove Criteria ?",
              showCancelButton: true,
              confirmButtonText: "Delete",
              confirmButtonColor: "#c73e1d",
              confirm,
            }).then((result) => {
              if (result.isConfirmed) {
                let path = `/eligibility_criterias/${row.id}`;
                deleteTrialInfo(protocolID, siteID, path)
                  .then(() => {
                    Swal.fire({
                      icon: "success",
                      title: "Criteria deleted successfully",
                    });
                    let newEligibilityCriterias = [...eligibilityCriterias];
                    newEligibilityCriterias = newEligibilityCriterias.filter(
                      (item) => item.id !== row.id
                    );
                    setEligibilityCriterias(newEligibilityCriterias);
                  })
                  .catch((err) =>
                    alert("Error on deleting eligibility criteria")
                  );
              }
            });
          }}
        >
          <GrFormClose size={20} color="red" />
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      name: "Actions",
    },
  ];

  // Functions

  const handleSubmitStudyInformation = () => {
    setStudyInformationModal(false);
    if (studyInformationData.title && studyInformationData.body) {
      updateTrialSite(
        protocolID,
        siteID,
        studyInformationData,
        "study_informations"
      );
      let newStudyInformation = [...studyInformations];
      newStudyInformation.push(studyInformationData);
      setStudyInformations(newStudyInformation);
      Swal.fire({
        icon: "success",
        title: "Study Information added successfully",
      });
    } else {
      alert("Please fill all the fields");
    }
  };

  const handleSubmitAdminIssues = () => {
    setAdminIssuesModal(false);
    if (adminIssuesData.name && adminIssuesData.body) {
      updateTrialSite(protocolID, siteID, adminIssuesData, "admin_issues");
      let newAdminIssues = [...adminIssues];
      newAdminIssues.push(adminIssuesData);
      setAdminIssues(newAdminIssues);
      Swal.fire({
        icon: "success",
        title: "Admin Issues added successfully",
      });
    } else {
      alert("Please fill all the fields");
    }
  };

  const handleSubmitEligibilityCriteria = () => {
    setEligibilityCriteriasModal(false);
    if (eligibilityCriteriaData.name) {
      updateTrialSite(
        protocolID,
        siteID,
        eligibilityCriteriaData,
        "eligibility_criterias"
      );
      let newEligibilityCriterias = [...eligibilityCriterias];
      newEligibilityCriterias.push(eligibilityCriteriaData);
      setEligibilityCriterias(newEligibilityCriterias);
      Swal.fire({
        icon: "success",
        title: "Eligibility Criteria added successfully",
      });
    } else {
      alert("Please fill all the fields");
    }
  };

  useEffect(() => {
    let data = fetchTrialSite(router?.query?.trial_id, router?.query?.site_id);
    if (data) {
      setAdminIssues(Object.values(data.admin_issues));
      setStudyInformations(Object.values(data.study_informations));
      setEligibilityCriterias(Object.values(data.eligibility_criterias));
      setAssignedStaffs(data.assigned_staffs);
      setProtocolID(router?.query?.trial_id);
      setSiteID(router?.query?.site_id);
    }
  }, [router?.query?.trial_id, router?.query?.site_id]);

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
        <div className={styles.panel__header}>Protocol Information</div>
        <div className={styles.panel__content}>
          <Tabs
            defaultActiveKey="profile"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="study_information" title="Study Information">
              <Button
                className="buttonPrimary"
                onClick={() => setStudyInformationModal(true)}
                style={{ marginBottom: "2%" }}
              >
                Add Study Information
              </Button>
              <DataTable
                columns={studyInformationColumns}
                data={studyInformations}
              />
            </Tab>
            <Tab eventKey="admin_issues" title="Admin Issues">
              <Button
                className="buttonPrimary"
                onClick={() => setAdminIssuesModal(true)}
                style={{ marginBottom: "2%" }}
              >
                Add Admin Issue
              </Button>
              <DataTable columns={adminIssuesColumns} data={adminIssues} />
            </Tab>
          </Tabs>
        </div>
      </div>

      <div className={styles.section__panel}>
        <div className={styles.panel__header}>Eligibility Criterias</div>
        <div className={styles.panel__content}>
          <div
            className={[styles.panel__wrapper, styles.left__align].join(" ")}
          >
            <Button
              className="buttonPrimary"
              onClick={() => setEligibilityCriteriasModal(true)}
            >
              Add Criteria
            </Button>
          </div>

          <DataTable
            columns={eligibilityCriteriasColumns}
            data={eligibilityCriterias}
          />
        </div>
      </div>

      <div className={styles.section__panel}>
        <div className={styles.panel__header}>Assigned Staffs</div>
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

      <CustomModal
        visible={studyInformationModal}
        handleClose={() => setStudyInformationModal(false)}
        title="Add Study Information"
        body={
          <Form>
            <FormGroup className="mb-3" controlId="formBasicEmail">
              <FormLabel>Title</FormLabel>
              <FormControl
                type="title"
                placeholder="Add Title..."
                required
                onChange={(e) =>
                  setStudyInformationData({
                    ...studyInformationData,
                    title: e.target.value,
                  })
                }
              />
            </FormGroup>

            <FormGroup className="mb-3" controlId="formBasicEmail">
              <FormLabel>Body</FormLabel>
              <FormControl
                type="title"
                placeholder="Add Body..."
                required
                onChange={(e) =>
                  setStudyInformationData({
                    ...studyInformationData,
                    body: e.target.value,
                  })
                }
              />
            </FormGroup>
          </Form>
        }
        handleSubmit={handleSubmitStudyInformation}
      />

      <CustomModal
        visible={adminIssuesModal}
        handleClose={() => setAdminIssuesModal(false)}
        title="Add Admin Issue"
        body={
          <Form>
            <FormGroup className="mb-3" controlId="formBasicEmail">
              <FormLabel>Title</FormLabel>
              <FormControl
                type="title"
                placeholder="Add Title..."
                required
                onChange={(e) =>
                  setAdminIssuesData({
                    ...adminIssuesData,
                    name: e.target.value,
                  })
                }
              />
            </FormGroup>

            <FormGroup className="mb-3" controlId="formBasicEmail">
              <FormLabel>Body</FormLabel>
              <FormControl
                type="title"
                placeholder="Add Body..."
                required
                onChange={(e) =>
                  setAdminIssuesData({
                    ...adminIssuesData,
                    body: e.target.value,
                  })
                }
              />
            </FormGroup>
          </Form>
        }
        handleSubmit={handleSubmitAdminIssues}
      />

      <CustomModal
        visible={eligibilityCriteriasModal}
        handleClose={() => setEligibilityCriteriasModal(false)}
        title="Add New Criteria"
        body={
          <Form>
            <FormGroup className="mb-3" controlId="formBasicEmail">
              <FormLabel>Criteria</FormLabel>
              <FormControl
                type="title"
                placeholder="Add criteria..."
                required
                onChange={(e) =>
                  setEligibilityCriteriaData({
                    ...eligibilityCriteriaData,
                    name: e.target.value,
                  })
                }
              />
            </FormGroup>
          </Form>
        }
        handleSubmit={handleSubmitEligibilityCriteria}
      />
    </div>
  );
}
