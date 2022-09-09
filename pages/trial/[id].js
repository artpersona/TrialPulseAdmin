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
import { useSiteContext } from "../../shared/contexts/SitesContext";
import { useAppContext } from "../../shared/contexts/AppContext";
import { CustomModal } from "../../components";
import DataTable from "react-data-table-component";
import { GrFormClose } from "react-icons/gr";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function IndividualTrial() {
  const router = useRouter();
  const id = router?.query?.id;
  const {
    findProtocol,
    updateProtocol,
    addEligibilityCriteria,
    deleteTrialInfo,
  } = useProtocolContext();
  const { trialStatus } = useAppContext();
  const { sites } = useSiteContext();
  const [trialData, setTrialData] = useState(null);

  const [addSiteModal, setAddSiteModal] = useState(false);

  const [availableSites, setAvailableSites] = useState([]);
  const [selectedSites, setSelectedSites] = useState([]);

  const [indiSelectedSites, setIndiSelectedSites] = useState(null);

  // Eligibility Criteria
  const [eligibilityCriterias, setEligibilityCriterias] = useState([]);
  const [eligibilityCriteriasModal, setEligibilityCriteriasModal] =
    useState(false);
  const [eligibilityCriteriaData, setEligibilityCriteriaData] = useState({
    name: "",
  });

  // Study Information
  const [studyInformation, setStudyInformation] = useState({
    study_description: "",
    phase: "",
    lte_duration: "",
    placebo: "",
    population: "",
    drug: {
      name: "",
      route: [],
      target: "",
      treatment_period: "",
    },
  });

  const [informationErrors, setInformationErrors] = useState({});
  const [informationDrugErrors, setInformationDrugErrors] = useState({});

  // Study Information
  const handleInformationChange = (field, value) => {
    setStudyInformation({
      ...studyInformation,
      [field]: value,
    });

    if (!!informationErrors[field]) {
      setInformationErrors({
        ...informationErrors,
        [field]: null,
      });
    }
  };

  const handleChangeDrug = (field, value, drugRoute) => {
    let drugData = { ...studyInformation?.drug };
    console.log(typeof drugData);
    if (field === "route") {
      if (drugData?.route) {
        let routeValues = Object.values(drugData.route);
        if (routeValues.includes(drugRoute)) {
          routeValues = routeValues.filter((item) => item !== drugRoute);
        } else {
          routeValues.push(drugRoute);
        }
        drugData[field] = routeValues;
      } else {
        drugData.route = [drugRoute];
      }
    } else {
      drugData[field] = value;
    }

    setStudyInformation({
      ...studyInformation,
      drug: drugData,
    });

    if (!!informationDrugErrors[field]) {
      setInformationDrugErrors({
        ...informationDrugErrors,
        [field]: null,
      });
    }
  };

  const validateInformationForm = () => {
    console.log(studyInformation);
    let errors = {};
    let drugErrors = {};

    const { study_description, phase, lte_duration, placebo, population } =
      studyInformation;
    const { name, route, target, treatment_period } = studyInformation.drug;

    if (!study_description || study_description === "") {
      errors.study_description = "Study Description is required";
    }
    if (!phase || phase === "") {
      errors.phase = "Phase is required";
    }
    if (!lte_duration || lte_duration === "") {
      errors.lte_duration = "LTE Duration is required";
    }
    if (!placebo) {
      console.log("placebo is: ", placebo);
      errors.placebo = "Placebo is required";
    }
    if (!population) {
      errors.population = "Population is required";
    }
    if (!name || name === "") {
      drugErrors.name = "Drug Name is required";
    }
    if (!route || route.length === 0) {
      drugErrors.route = "Drug Route is required";
    }
    if (!target || target === "") {
      drugErrors.target = "Drug Target is required";
    }
    if (!treatment_period || treatment_period === "") {
      drugErrors.treatment_period = "Drug Treatment Period is required";
    }

    return {
      errors,
      drugErrors,
      count: Object.keys(errors).length + Object.keys(drugErrors).length,
    };
  };

  const handleSubmitInformation = (e) => {
    e.preventDefault();
    const allErrors = validateInformationForm();

    if (allErrors.count > 0) {
      setInformationErrors(allErrors.errors);
      setInformationDrugErrors(allErrors.drugErrors);
    } else {
      let data = { ...studyInformation };
      data.id = id;
      console.log("study information is: ", studyInformation);
      updateProtocol(data, "/study_information")
        .then(() => {
          MySwal.fire({
            title: "Success!",
            text: "Study Information has been updated",
            icon: "success",
            confirmButtonText: "OK",
          });
        })
        .catch((err) => {
          MySwal.fire({
            title: "Error!",
            text: err.message,
            icon: "error",
            confirmButtonText: "OK",
          });
        });
    }
  };

  const columns = [
    {
      name: "Site",
      selector: (row) => row.name,
    },
    {
      name: "Assigned Date",
      selector: (row) => "July 06, 2022",
    },
  ];

  // Protocol Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    updateProtocol(trialData);
    Swal.fire({
      icon: "success",
      title: "Changes Saved",
    });
  };

  const handleAssignSite = (e) => {
    if (indiSelectedSites === "none" || indiSelectedSites === null) {
      MySwal.fire({
        title: "Error!",
        text: "Please select a site",
        icon: "error",
        confirmButtonText: "Test",
      });
    } else {
      e.preventDefault();
      let tempData = [...selectedSites];
      let pushData = {
        siteId: indiSelectedSites,
      };
      tempData.push(pushData);

      updateProtocol({ host_sites: tempData, id: trialData.id }, "/host_sites")
        .then((data) => {
          // setSelectedSites(tempData);
          MySwal.fire({
            title: "Success!",
            text: "Site has been assigned",
            icon: "success",
            confirmButtonText: "OK",
          });
          setAddSiteModal(false);
        })
        .catch((err) => {
          MySwal.fire({
            title: "Error!",
            text: err.message,
            icon: "error",
            confirmButtonText: "OK",
          });
        });
    }
  };

  // Eligibility Criteria Submit
  const handleSubmitEligibilityCriteria = () => {
    setEligibilityCriteriasModal(false);
    if (eligibilityCriteriaData.name) {
      addEligibilityCriteria(router?.query?.id, eligibilityCriteriaData);
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
                deleteTrialInfo(trialData.id, path)
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

  useEffect(() => {
    if (router?.query?.id) setTrialData(findProtocol(id));
  }, [router.query]);

  useEffect(() => {
    if (trialData) {
      let existingSitesIds = [];
      let existingSites = [];
      if (trialData?.host_sites) {
        existingSitesIds = trialData?.host_sites.map((item) => {
          return item.siteId;
        });
      }

      let displayedSites = [...sites];
      displayedSites = displayedSites.filter((item) => {
        if (existingSitesIds.includes(item.id)) {
          existingSites.push(item);
        } else {
          return !existingSitesIds.includes(item.id);
        }
      });

      setSelectedSites(existingSites);
      setAvailableSites(displayedSites);

      let criterias = trialData?.eligibility_criterias
        ? Object.values(trialData?.eligibility_criterias)
        : [];
      setEligibilityCriterias(criterias);
      if (trialData?.study_information)
        setStudyInformation(trialData?.study_information);
    }
  }, [trialData]);

  return (
    <div className={styles.container}>
      <div className={styles.trial__container}>
        <h7 className={styles.trial__title}>{trialData?.name}</h7>
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
                  value={trialData?.trial_status}
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
        <div className={styles.panel__header}>Trial Information</div>
        <div className={styles.panel__content}>
          <div className={styles.panel__wrapper}>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Trial Description</Form.Label>
                <Form.Control
                  type="title"
                  placeholder="Enter title"
                  defaultValue={studyInformation?.study_description}
                  onChange={(e) =>
                    handleInformationChange("study_description", e.target.value)
                  }
                  required
                  isInvalid={!!informationErrors.study_description}
                />
                <Form.Control.Feedback type="invalid">
                  {informationErrors.study_description}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Phase</Form.Label>
                <Form.Control
                  type="title"
                  placeholder="Enter title"
                  defaultValue={studyInformation?.phase}
                  onChange={(e) =>
                    handleInformationChange("phase", e.target.value)
                  }
                  required
                  isInvalid={!!informationErrors.phase}
                />
                <Form.Control.Feedback type="invalid">
                  {informationErrors.phase}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Drug</Form.Label>
                <Form.Control
                  type="title"
                  placeholder="Enter title"
                  defaultValue={studyInformation?.drug?.name}
                  onChange={(e) => handleChangeDrug("name", e.target.value)}
                  required
                  isInvalid={!!informationDrugErrors?.name}
                />
                <Form.Control.Feedback type="invalid">
                  {informationDrugErrors.name}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Route</Form.Label>
                <div key={`inline-checkbox`} className="mb-3">
                  <Form.Check
                    inline
                    label="IV Treatment"
                    name="group1"
                    type={"checkbox"}
                    id={`inline-checkbox-1`}
                    value={
                      studyInformation?.drug?.route &&
                      Object.values(studyInformation?.drug?.route)?.includes(
                        "iv_bag"
                      )
                    }
                    onChange={(e) =>
                      handleChangeDrug("route", e.target.value, "iv_bag")
                    }
                    isInvalid={!!informationDrugErrors?.route}
                  />
                  <Form.Check
                    inline
                    label="Injection"
                    name="group1"
                    type={"checkbox"}
                    id={`inline-checkbox-2`}
                    value={
                      studyInformation?.drug?.route &&
                      Object.values(studyInformation?.drug?.route)?.includes(
                        "injection"
                      )
                    }
                    onChange={(e) =>
                      handleChangeDrug("route", e.target.value, "injection")
                    }
                    isInvalid={!!informationDrugErrors?.route}
                  />
                </div>
                <Form.Control.Feedback type="invalid">
                  {informationDrugErrors.route}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Target</Form.Label>
                <Form.Control
                  type="title"
                  placeholder="Enter title"
                  defaultValue={studyInformation?.drug?.target}
                  onChange={(e) => handleChangeDrug("target", e.target.value)}
                  required
                  isInvalid={!!informationDrugErrors?.target}
                />
                <Form.Control.Feedback type="invalid">
                  {informationDrugErrors.target}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Treatment Period</Form.Label>
                <Form.Control
                  type="title"
                  placeholder="Enter title"
                  defaultValue={studyInformation?.drug?.treatment_period}
                  onChange={(e) =>
                    handleChangeDrug("treatment_period", e.target.value)
                  }
                  required
                  isInvalid={!!informationDrugErrors?.treatment_period}
                />
                <Form.Control.Feedback type="invalid">
                  {informationDrugErrors.treatment_period}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>LTE Duration</Form.Label>
                <Form.Control
                  type="title"
                  placeholder="Enter title"
                  defaultValue={studyInformation?.lte_duration}
                  onChange={(e) =>
                    handleInformationChange("lte_duration", e.target.value)
                  }
                  required
                  isInvalid={!!informationErrors.lte_duration}
                />
                <Form.Control.Feedback type="invalid">
                  {informationErrors.lte_duration}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Placebo</Form.Label>
                <div key={`inline-checkbox`} className="mb-3">
                  <Form.Check
                    inline
                    label="IV Treatment"
                    name="group1"
                    type={"switch"}
                    id={`inline-checkbox-1`}
                    value={studyInformation?.placebo}
                    onChange={(e) =>
                      handleInformationChange("placebo", e.target.checked)
                    }
                    isInvalid={!!informationErrors.placebo}
                  />
                </div>
                <Form.Control.Feedback type="invalid">
                  {informationErrors.placebo}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Population</Form.Label>
                <Form.Control
                  type="title"
                  placeholder="Enter title"
                  defaultValue={studyInformation?.population}
                  onChange={(e) =>
                    handleInformationChange("population", e.target.value)
                  }
                  required
                  isInvalid={!!informationErrors.population}
                />
                <Form.Control.Feedback type="invalid">
                  {informationErrors.population}
                </Form.Control.Feedback>
              </Form.Group>

              <Button
                className="buttonPrimary"
                onClick={handleSubmitInformation}
              >
                Save Changes
              </Button>
            </Form>
          </div>
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
            disabled={availableSites.length === 0}
          >
            Assign Site
          </Button>

          <DataTable columns={columns} data={selectedSites} />
        </Tab>
      </Tabs>

      <CustomModal
        visible={addSiteModal}
        handleClose={() => setAddSiteModal(false)}
        title="Assign Sitesssss"
        body={
          <Form.Select
            aria-label="Default select example"
            value={indiSelectedSites}
            onChange={(e) => setIndiSelectedSites(e.target.value)}
          >
            <option key={"0000"} value="none">
              Select a site
            </option>
            {availableSites.map((status) => {
              return (
                <option key={status.id} value={status.id}>
                  {status.name}
                </option>
              );
            })}
          </Form.Select>
        }
        handleSubmit={handleAssignSite}
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
