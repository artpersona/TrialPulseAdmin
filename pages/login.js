import styles from "../styles/Login.module.css";
import { Form, Button, InputGroup } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useAuthContext } from "../shared/contexts/AuthContext";
import { useRouter } from "next/router";
const App = () => {
  const { loginViaEmail, loggedUser } = useAuthContext();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [validated, setValidated] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    loginViaEmail(loginData.email, loginData.password)
      .then((data) => {
        router.push("/home");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (loggedUser) {
      router.push("/home");
    }
  }, [loggedUser, router]);
  return (
    <div className={styles.wrapper}>
      <Form
        className={styles.form_signin}
        // noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <h4 className={styles.heading}>TRIAL PULSE </h4>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            required
            onChange={(e) =>
              setLoginData({
                ...loginData,
                email: e.target.value,
              })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              required
              onChange={(e) =>
                setLoginData({
                  ...loginData,
                  password: e.target.value,
                })
              }
            />
            <div
              className={styles.eye_icon}
              onClick={() => setShowPassword(!showPassword)}
            >
              {!showPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </div>
          </InputGroup>
        </Form.Group>
        {/* <a className={styles.forgotPassword__link}>Forgot Password</a> */}

        <Button type="submit" className={styles.submitButton}>
          Submit
        </Button>

        <p className={styles.footer__text}>
          If you would like to join Consent Tech, please speak with your doctor.
        </p>
      </Form>
    </div>
  );
};

export default App;
