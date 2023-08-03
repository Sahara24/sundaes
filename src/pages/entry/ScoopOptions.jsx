import React from "react";
import { Col } from "react-bootstrap";

function ScoopOptions({ name, imagePath }) {
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} Scoop`}
      />
      <h1>{name}</h1>
    </Col>
  );
}

export default ScoopOptions;
