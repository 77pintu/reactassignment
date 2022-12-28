import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, Link } from "react-router-dom";
import { auth, sendPasswordReset } from "../auth/firebase";

export default function Reset() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [usersDetailsStatus, loading, error] = useAuthState(auth);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      window.confirm(
        "Please check mail reset link successfully has been sent your mail id"
      )
    ) {
      sendPasswordReset(email);
      navigate("/");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (usersDetailsStatus) navigate("/");
  }, [usersDetailsStatus, loading]);
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
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="abc@gmail.com"
                />
                <Form.Text className="text-muted">
                  Please the enter the registered email id
                </Form.Text>
              </Form.Group>
              <Button
                as="input"
                variant="success"
                className="mx-1"
                type="submit"
                value="Submit"
              />
              <Button
                as="input"
                variant="info"
                onClick={() => navigate("/")}
                className="mx-1"
                type="submit"
                value="Back"
              />
              <br /> Don't have an account? <Link to="/create">Register</Link>{" "}
              now.
            </Form>
          </Col>
          <Col sm={12} md={4} lg={4} />
        </Row>
      </Container>
    </>
  );
}
