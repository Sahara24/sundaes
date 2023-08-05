import React from "react";
import { Col } from "react-bootstrap";

const ToppingOption = ({ name, imagePath }) => {
  return (
    <Col xs={12} sm={6} md={4} lg={2} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} Topping`}
      />
      <h4>{name}</h4>
    </Col>
  );
};

export default ToppingOption;
