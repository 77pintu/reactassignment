import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, Link } from "react-router-dom";
import { auth, sendPasswordReset } from "../auth/firebase";

const Reset = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState(false);
  const [usersDetailsStatus, loading, error] = useAuthState(auth);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email.length) {
      setErrors(true);
      return;
    } else {
      if (
        window.confirm(
          "Please check mail reset link successfully has been sent your mail id"
        )
      ) {
        sendPasswordReset(email);
        navigate("/");
      }
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
                  {errors ? (
                    <p className="mt-3">
                      Please the enter the registered email id
                    </p>
                  ) : (
                    ""
                  )}
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
                data-testid="backbutton"
              />
              <br /> Don't have an account?{" "}
              <Link to="/create" data-testid="registerbutton">
                Register
              </Link>{" "}
              now.
            </Form>
          </Col>
          <Col sm={12} md={4} lg={4} />
        </Row>
      </Container>
    </>
  );
};
export default Reset;
