import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  auth,
  logInWithEmailAndPassword,
  signInWithGoogle,
} from "../auth/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, Link } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate();
  const [usersDetailsStatus, loading] = useAuthState(auth);
  const [data, setData] = useState({ email: "", password: "" });
  const handleInput = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setData(data);
    logInWithEmailAndPassword(data.email, data.password);
    navigate("/home");
  };
  useEffect(() => {
    if (loading) {
      return;
    }
    if (usersDetailsStatus) navigate("/home");
  }, [usersDetailsStatus, loading, navigate]);
  return (
    <>
      <Container className="my-5">
        <Row>
          <Col sm={12} md={4} lg={4} />
          <Col sm={12} md={4} lg={4}>
            <Form onSubmit={handleSubmit}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  onChange={handleInput}
                  placeholder="abc@gmail.com"
                  autoComplete="off"
                  required
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput2"
              >
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  onChange={handleInput}
                  placeholder="***********"
                  autoComplete="off"
                  required
                />
              </Form.Group>
              <Button
                as="input"
                variant="success"
                type="submit"
                value="Login"
                data-testid="user-login"
              />
              <br />
              <Button
                as="input"
                className="my-4"
                variant="info"
                onClick={signInWithGoogle}
                type="submit"
                value="Login with GoogleAccount"
              />
              <Button
                as="input"
                variant="warning"
                onClick={() => navigate("/reset")}
                className="mx-1 "
                type="submit"
                value="Forgot Password"
              />
              <br />
              <br />
              <small>Don't have Account?</small>{" "}
              <Link to="/create">Register</Link> Now
            </Form>
          </Col>
          <Col sm={12} md={4} lg={4} />
        </Row>
      </Container>
    </>
  );
}
