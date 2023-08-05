import React from "react";
import { Col } from "react-bootstrap";

function ScoopOptions({ name, imagePath }) {
  return (
    <Col xs={12} sm={6} md={4} lg={2} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} Scoop`}
      />
      <h4>{name}</h4>
    </Col>
  );
}

export default ScoopOptions;
