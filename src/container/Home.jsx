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
import "./Home.scss";
import { deleteAsyncUsers, getAsyncUsers } from "../slice/userSlice";
import { Outlet, useNavigate } from "react-router-dom";
import Edit from "./Edit";
import { Button } from "react-bootstrap";
import swal from "sweetalert";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modalShow, setModalShow] = React.useState(false);
  const [like, setLike] = useState(false);
  const [singleVal, setSingleVal] = useState();
<<<<<<< HEAD
  const { user, isLoading } = useSelector((state) => state?.users);
=======
  const { user, isLoading, error } = useSelector((state) => state?.users);
>>>>>>> d1649fcb7c334e5a811483d54dc7a924d225f664
  const [usersDetailsStatus, loading] = useAuthState(auth);

  useEffect(() => {
    dispatch(getAsyncUsers());
  }, [dispatch]);
  const handleDelete = (id) => {
    swal({
      title: "Are you sure want to delete it?",
      text: "Once deleted, you will not be able to recover this your data!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("User Data has been successfully deleted!", {
          icon: "success",
        });
        dispatch(deleteAsyncUsers(id));
        navigate("/home");
      } else {
        swal("Your data not deleted!");
      }
    });
  };
  const uniqueLike = user.filter((_) => _.id === singleVal)[0]?.id;
  const handleEditRedirect = (id) => {
    setModalShow(true);
    navigate(`/home/edit/${id}`);
  };
  const editsuccess = (isSuccess) => {
    setModalShow(isSuccess);
  };
  const isLike = (event, id) => {
    setLike(!like);
    setSingleVal(id);
  };
  useEffect(() => {
    if (loading) return;
    if (!usersDetailsStatus) return navigate("/");
  }, [usersDetailsStatus, loading, navigate]);
  return (
    <>
      <Outlet />
      <Container className="pt-5 mt-2">
        <Row>
          <Col>
<<<<<<< HEAD
            <h1 className="textSize textColor"> Welcome</h1>
=======
            <h1> Welcome</h1>
>>>>>>> d1649fcb7c334e5a811483d54dc7a924d225f664
            <Button
              className="mx-4 floatButton"
              variant="danger"
              onClick={logout}
<<<<<<< HEAD
=======
              style={{ float: "right" }}
>>>>>>> d1649fcb7c334e5a811483d54dc7a924d225f664
              test-id="logoutButton"
            >
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
<<<<<<< HEAD
            {user?.length
              ? user?.map((user) => {
                  return (
                    <Col
                      sm={12}
                      md={6}
                      lg={3}
                      className="my-4 "
                      key={user?.id}
                      data-testid="custom-element"
                    >
                      <Card>
                        <Card.Img
                          className="pt-3 dummyImage"
                          variant="top"
                          src={`https://avatars.dicebear.com/v2/avataaars/${user?.name}.svg?options[mood][]=happy`}
                        />
                        <Card.Body className="my-4">
                          <Card.Title className="mx-3 cardFontSize">
                            {user?.name}
                          </Card.Title>
                          <Card.Title muted>
                            <span className="mx-3 cardFontSize">
                              {" "}
                              <AiOutlineMail />
=======
            {user.map((user) => {
              return (
                <Col
                  sm={12}
                  md={6}
                  lg={3}
                  className="my-4 "
                  key={user.id}
                  data-testid="custom-element"
                >
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
                      <Button
                        data-testid="viewbutton"
                        className="mt-3 mx-4"
                        variant="secondary"
                        onClick={() => navigate(`/profile/${user.id}`)}
                      >
                        View Details
                      </Button>
                    </Card.Body>
                    <Card.Footer className="pb-3">
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
>>>>>>> d1649fcb7c334e5a811483d54dc7a924d225f664
                            </span>
                            <span className="cardFontSize"> {user?.email}</span>
                          </Card.Title>
                          <Card.Title muted>
                            <span className="mx-3 cardFontSize">
                              <AiOutlinePhone />
                            </span>{" "}
                            <span className="cardFontSize"> {user?.phone}</span>
                          </Card.Title>
                          <Card.Title muted>
                            <span className="mx-3 cardFontSize">
                              <AiOutlineGlobal />
                            </span>{" "}
                            <span className="webIconColor">
                              {" "}
                              {user?.website}
                            </span>
                          </Card.Title>
                          <Button
                            data-testid="viewbutton"
                            className="mt-3 mx-4"
                            variant="secondary"
                            onClick={() => navigate(`/profile/${user?.id}`)}
                          >
                            View Details
                          </Button>
                        </Card.Body>
                        <Card.Footer className="pb-3">
                          <Row>
                            <Col>
                              <span
                                onClick={(event) => isLike(event, user?.id)}
                                className="heartFontSize"
                              >
                                {!(uniqueLike === user?.id && like) ? (
                                  <AiOutlineHeart />
                                ) : (
                                  <AiFillHeart />
                                )}
                              </span>
                            </Col>
                            <Col>
                              <button
                                onClick={() => {
                                  handleEditRedirect(user?.id);
                                }}
                                className="editIcon"
                              >
                                <span>
                                  <AiOutlineEdit />
                                </span>
                              </button>
                              <Edit
                                name={user?.name}
                                email={user?.email}
                                phone={user?.phone}
                                website={user?.website}
                                editsuccess={editsuccess}
                                show={modalShow}
                                onHide={() => {
                                  setModalShow(false);
                                  navigate(`/home`);
                                }}
                              />
                            </Col>
                            <Col>
                              <button
                                onClick={() => handleDelete(user?.id)}
                                className="editIcon"
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
                })
              : null}
          </Row>
        </Container>
      )}
    </>
  );
};

export default Home;
