import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editAsyncUsers } from "../slice/userSlice";
export default function Edit(props) {
  const { idUser } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [editUser, setEditUser] = useState();

  const getData = useSelector(
    (state) => state.users.user.filter((_) => _.id === parseInt(idUser))[0]
  );
  useEffect(() => {
    setEditUser(getData);
  }, [idUser]);
  const handleEdit = (event) => {
    setEditUser({ ...editUser, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editAsyncUsers(editUser)).then(() => navigate("/home"));
    props.onEditSuccess(false);
  };
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit User Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleEdit}
              value={editUser?.name}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={handleEdit}
              value={editUser?.email}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              placeholder="Phone"
              onChange={handleEdit}
              value={editUser?.phone}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Website</Form.Label>
            <Form.Control
              type="text"
              name="website"
              placeholder="website"
              onChange={handleEdit}
              value={editUser?.website}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Edit
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
