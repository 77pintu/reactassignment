import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { v4 as uuid } from "uuid";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  signInWithGoogle,
  registerWithEmailAndPassword,
} from "../auth/firebase";

export default function CreateLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const unique_id = uuid();
  const small_id = unique_id.slice(0, 8);
  const handleInput = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const register = (event) => {
    event.preventDefault();
    registerWithEmailAndPassword(data.name, data.email, data.password);
    navigate("/");
  };

  return (
    <>
      <Container className="my-5">
        <Row>
          <Col sm={12} md={4} lg={4} />
          <Col sm={12} md={4} lg={4}>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  onChange={handleInput}
                  placeholder="username or email"
                  required
                  autoComplete="off"
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput2"
              >
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  onChange={handleInput}
                  placeholder="username or email"
                  autoComplete="off"
                  required
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput3"
              >
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  onChange={handleInput}
                  placeholder="***********"
                />
              </Form.Group>
              <Button
                as="input"
                variant="success"
                onClick={register}
                className="mx-3 my-3"
                type="submit"
                value="Register"
              />
              <Button
                as="input"
                variant="secondary"
                onClick={signInWithGoogle}
                className="mx-3"
                type="submit"
                value="Register With Google Account"
              />
              <br />
              <br />
              Already have an account? <Link to="/">Login</Link> now.
            </Form>
          </Col>
          <Col sm={12} md={4} lg={4} />
        </Row>
      </Container>
    </>
  );
}
