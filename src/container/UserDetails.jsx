import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import css from "./UserDetails.scss";
export default function UserDetails() {
  const { idDetails } = useParams();
  const navigate = useNavigate();
  const getData = useSelector(
    (state) => state.users.user.filter((_) => _.id === parseInt(idDetails))[0]
  );
  return (
    <>
      <Container>
        <Button
          className="my-5"
          variant="info"
          onClick={() => navigate("/home")}
        >
          Back
        </Button>
        <Row>
          <Col xl={12} md={12} lg={12}>
            <Card className="bg-dark text-white py-2">
              <Card.Img
                src={`https://avatars.dicebear.com/v2/avataaars/${getData?.name}.svg?options[mood][]=happy`}
                alt="Card image"
                className="dummyImageHeight"
              />
              <Card.ImgOverlay className="p-4">
                <Card.Title>
                  <span className="p-3">Name: </span> {getData?.name}
                </Card.Title>

                <Card.Title>
                  <span className="p-3">Email: </span> {getData?.email}
                </Card.Title>
                <Card.Title>
                  <span className="p-3">Phone: </span> {getData?.phone}
                </Card.Title>
                <Card.Title>
                  <span className="p-3">Address: </span>{" "}
                  {getData?.address?.city},{getData?.street},
                  {getData?.address?.suite}-{getData?.address?.zipcode}
                  {console.log(getData.address)}
                </Card.Title>
                <Card.Title>
                  <span className="p-3">Company Details: </span>{" "}
                </Card.Title>
                <Card.Text className="p-3">
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </Card.Text>
              </Card.ImgOverlay>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
