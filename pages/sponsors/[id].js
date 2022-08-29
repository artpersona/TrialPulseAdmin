import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/Sponsors.module.css";
import {
  InputGroup,
  FormControl,
  Form,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { ProtocolItem, StaffItem, Empty, CustomModal } from "../../components";
import { useSponsorContext } from "../../shared/contexts/SponsorsContext";
import { useProtocolContext } from "../../shared/contexts/ProtocolContext";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

export default function Sponsor() {
  const router = useRouter();
  const id = router.query.id;
  const {
    getSpecificSponsor,
    getSpecificSponsorProtocols,
    addSponsorStaff,
    fetchStaff,
  } = useSponsorContext();

  const { addProtocol } = useProtocolContext();

  const [data, setData] = useState(null);
  const [protocols, setProtocols] = useState([]);
  const [staffModal, setStaffModal] = useState(false);
  const [protocolModal, setProtocolModal] = useState(false);
  const [staffs, setStaff] = useState([]);

  const [protocolData, setProtocolData] = useState({
    name: "",
    sponsor_id: "",
  });

  //  Staff Input
  const [staffData, setStaffData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    role: "medical_monitor",
  });

  const [staffErrors, setStaffErrors] = useState({});

  const handleStaffChange = (field, value) => {
    setStaffData({
      ...staffData,
      [field]: value,
    });

    if (!!staffErrors[field]) {
      setStaffErrors({
        ...staffErrors,
        [field]: null,
      });
    }
  };

  // End Staff Input

  const handleSubmitProtocol = () => {
    console.log("data is: ", data);
    let appendedData = { ...protocolData, sponsor: data };
    addProtocol(appendedData)
      .then((key) => {
        router.push({
          pathname: `/trial/${key}`,
          query: { sponsor: JSON.stringify(data) },
        });
      })
      .catch((err) => alert(err));
    setProtocolModal(false);
  };

  const handleSubmitStaff = (e) => {
    console.log("data is: ", data);
    e.preventDefault();

    const staffErrors = validateStaffForm();

    if (Object.keys(staffErrors).length > 0) {
      setStaffErrors(staffErrors);
    } else {
      addSponsorStaff(staffData, data.id)
        .then(() => {
          setStaffData({
            email: "",
            firstName: "",
            lastName: "",
            role: "medical_monitor",
          });
          setStaffModal(false);
        })
        .catch((err) => {
          alert(err);
          setStaffModal(false);
        });
    }
  };

  const validateStaffForm = () => {
    const { email, firstName, lastName, role } = staffData;

    const errors = {};

    if (!email || email === "") errors.email = "Email is required";
    if (!firstName || firstName === "")
      errors.firstName = "First Name is required";
    if (!lastName || lastName === "") errors.lastName = "Last Name is required";
    if (!role || role === "") errors.role = "Role is required";

    return errors;
  };

  const onStaffRemove = () => {
    MySwal.fire({
      icon: "danger",
      title: "Delete Staff ?",
      text: "All data and login credentials will be deleted",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "#c73e1d",
      confirm,
    }).then((result) => {
      if (result.isConfirmed) {
        removeSponsor(data.id).then(() => {
          Swal.fire({
            icon: "success",
            title: "Staff deleted successfully",
          });
        });
      }
    });
  };

  useEffect(() => {
    setData(getSpecificSponsor(id));
    setProtocols(getSpecificSponsorProtocols(id));
    fetchStaff(id, setStaff);
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
              onClick={() => setStaffModal(true)}
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
            {staffs?.map((staff) => {
              return <StaffItem key={staff.id} staff={staff} />;
            })}
          </div>

          {staffs?.length === 0 && <Empty name={"staff"} />}
        </div>
        <div className={styles.protocolContainer}>
          <p className={styles.headerTitle}>Protocols</p>
          <div className={styles.header}>
            <button
              className="buttonPrimary"
              onClick={() => setProtocolModal(true)}
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
            {protocols?.length === 0 && <Empty name={"protocol"} />}
          </div>
        </div>
      </div>

      <CustomModal
        visible={staffModal}
        handleClose={() => setStaffModal(false)}
        title="Add Staff"
        body={
          <Form className={styles.form_signin}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                required
                name="email"
                onChange={(e) =>
                  handleStaffChange(e.target.name, e.target.value)
                }
                value={staffData.email}
                isInvalid={!!staffErrors.email}
              />
              <Form.Control.Feedback type="invalid">
                {staffErrors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                placeholder="Enter first name"
                required
                name="firstName"
                onChange={(e) =>
                  handleStaffChange(e.target.name, e.target.value)
                }
                value={staffData.firstName}
                isInvalid={!!staffErrors.firstName}
              />
              <Form.Control.Feedback type="invalid">
                {staffErrors.firstName}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                placeholder="Enter last name"
                required
                name="lastName"
                onChange={(e) =>
                  handleStaffChange(e.target.name, e.target.value)
                }
                value={staffData.lastName}
                isInvalid={!!staffErrors.lastName}
              />
              <Form.Control.Feedback type="invalid">
                {staffErrors.lastName}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Role</Form.Label>
              <Form.Select
                onChange={(e) => handleStaffChange("role", e.target.value)}
                value={staffData.role}
                isInvalid={!!staffErrors.role}
              >
                <option value="medical_monitor">Medical Monitor</option>
                <option value="admin">Admin</option>
              </Form.Select>
            </Form.Group>
          </Form>
        }
        handleSubmit={handleSubmitStaff}
      />

      <CustomModal
        visible={protocolModal}
        handleClose={() => setProtocolModal(false)}
        title="Add Protocol"
        body={
          <FormGroup className="mb-3" controlId="formBasicEmail">
            <FormLabel>Protocol Title</FormLabel>
            <FormControl
              type="title"
              placeholder="Add Protocol Title"
              required
              onChange={(e) =>
                setProtocolData({ ...protocolData, name: e.target.value })
              }
            />
          </FormGroup>
        }
        handleSubmit={handleSubmitProtocol}
      />
    </div>
  );
}
