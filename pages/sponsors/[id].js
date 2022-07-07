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
export default function Sponsor() {
  const router = useRouter();
  const id = router.query.id;
  console.log("id is: ", id);
  const { getSpecificSponsor, getSpecificSponsorProtocols } =
    useSponsorContext();
  const { addProtocol } = useProtocolContext();

  const [data, setData] = useState(null);
  const [protocols, setProtocols] = useState(null);
  const [staffModal, setStaffModal] = useState(false);
  const [protocolModal, setProtocolModal] = useState(false);

  const [protocolData, setProtocolData] = useState({
    name: "",
    sponsor_id: "",
  });
  const [staffData, setStaffData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    role: "",
  });

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
          <Form
            className={styles.form_signin}
            // noValidate
            // onSubmit={handleSubmit}
          >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>First Name</Form.Label>
              <Form.Control placeholder="Enter first name" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Last Name</Form.Label>
              <Form.Control placeholder="Enter last name" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Role</Form.Label>
              <Form.Select>
                {/* Refactor: must be database items   */}
                <option>Open this select menu</option>
                <option value="1">Admin</option>
                <option value="2">Site Staff</option>
                <option value="3">Monitor</option>
              </Form.Select>
            </Form.Group>
          </Form>
        }
        // handleSubmit={handleSubmit}
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
