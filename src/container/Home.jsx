import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../auth/firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineEdit,
  AiFillDelete,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineGlobal,
} from "react-icons/ai";
import { logout } from "../auth/firebase";
import css from "./Home.scss";
import { deleteAsyncUsers, getAsyncUsers } from "../slice/userSlice";
import { Outlet, useNavigate } from "react-router-dom";
import Edit from "./Edit";
import { Button } from "react-bootstrap";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modalShow, setModalShow] = React.useState(false);
  const [like, setLike] = useState(false);
  const [singleVal, setSingleVal] = useState();
  const { user, isLoading, error } = useSelector((state) => state.users);
  const [usersDetailsStatus, loading] = useAuthState(auth);
  useEffect(() => {
    dispatch(getAsyncUsers());
  }, []);
  const handleDelete = (id) => {
    if (window.confirm("Are you sure want to delete it")) {
      dispatch(deleteAsyncUsers(id));
      navigate("/home");
    }
  };
  const uniqueLike = user.filter((_) => _.id === singleVal)[0]?.id;
  const handleEditRedirect = (id) => {
    setModalShow(true);
    navigate(`/home/edit/${id}`);
  };
  const onEditSuccess = (isSuccess) => {
    setModalShow(isSuccess);
  };
  const isLike = (event, id) => {
    setLike(!like);
    setSingleVal(id);
  };
  useEffect(() => {
    if (loading) return;
    if (!usersDetailsStatus) return navigate("/");
  }, [usersDetailsStatus]);
  return (
    <>
      <Outlet />
      <Container>
        <Row>
          <Col>
            <Button className="m-4 text-left" variant="danger" onClick={logout}>
              Logout
            </Button>
          </Col>
        </Row>
      </Container>
      {user.length > 0 && isLoading ? (
        <div className="spinner">
          <div className="bounce1"></div>
          <div className="bounce2"></div>
          <div className="bounce3"></div>
        </div>
      ) : (
        <Container fluid>
          <Row className="mx-1">
            {user.map((user) => {
              return (
                <Col sm={12} md={6} lg={3} className="my-4 " key={user.id}>
                  <Card>
                    <Card.Img
                      className="pt-3"
                      variant="top"
                      src={`https://avatars.dicebear.com/v2/avataaars/${user.name}.svg?options[mood][]=happy`}
                      style={{
                        height: "20rem",
                        backgroundColor: "#f5f5f5",
                      }}
                    />
                    <Card.Body className="my-4">
                      <Card.Title
                        style={{ fontSize: "1.5rem" }}
                        className="mx-3"
                      >
                        {user.name}
                      </Card.Title>
                      <Card.Title muted>
                        <span style={{ fontSize: "2rem" }} className="mx-3">
                          {" "}
                          <AiOutlineMail />
                        </span>
                        <span style={{ color: "#92737d" }}> {user.email}</span>
                      </Card.Title>
                      <Card.Title muted>
                        <span style={{ fontSize: "2rem" }} className="mx-3">
                          <AiOutlinePhone />
                        </span>{" "}
                        <span style={{ color: "#92737d" }}> {user.phone}</span>
                      </Card.Title>
                      <Card.Title muted>
                        <span style={{ fontSize: "2rem" }} className="mx-3">
                          <AiOutlineGlobal />
                        </span>{" "}
                        <span style={{ color: "#92737d" }}>
                          {" "}
                          {user.website}
                        </span>
                      </Card.Title>
                    </Card.Body>
                    <Card.Footer className="py-3">
                      <Row>
                        <Col>
                          <span
                            onClick={(event) => isLike(event, user.id)}
                            style={{ fontSize: "2.2rem" }}
                          >
                            {!(uniqueLike === user.id && like) ? (
                              <AiOutlineHeart />
                            ) : (
                              <AiFillHeart />
                            )}
                          </span>
                        </Col>
                        <Col>
                          <button
                            onClick={() => {
                              handleEditRedirect(user.id);
                            }}
                            style={{ border: "none", fontSize: "2.2rem" }}
                          >
                            <span>
                              <AiOutlineEdit />
                            </span>
                          </button>
                          <Edit
                            name={user.name}
                            email={user.email}
                            phone={user.phone}
                            website={user.website}
                            onEditSuccess={onEditSuccess}
                            show={modalShow}
                            onHide={() => {
                              setModalShow(false);
                              navigate(`/home`);
                            }}
                          />
                        </Col>
                        <Col>
                          <button
                            onClick={() => handleDelete(user.id)}
                            style={{ border: "none", fontSize: "2.2rem" }}
                          >
                            {" "}
                            <AiFillDelete />
                          </button>
                        </Col>
                      </Row>
                    </Card.Footer>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      )}
    </>
  );
}
