import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Col } from "react-bootstrap";
import { useOrderDetails } from "../../contexts/OrderDetails";

function ScoopOptions({ name, imagePath }) {
  const { updateItemCount } = useOrderDetails();
  const [invalid, setInvalid] = useState("");
  const handleChange = (e) => {
    if (/^(0|[1-9]\d*)$/.test(e.target.value)) {
      setInvalid(() => "");
    } else {
      setInvalid(() => "invalid");
    }
    updateItemCount(
      name,
      parseInt(e.target.value === "" ? 0 : e.target.value),
      "scoops"
    );
  };
  return (
    <Col xs={12} sm={6} md={4} lg={2} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} Scoop`}
      />
      <h4>{name}</h4>
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: "10px" }}
      >
        <Form.Label column xs="6" style={{ textAlign: "right" }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{ textAlign: "left" }}>
          <Form.Control
            type="number"
            defaultValue={0.0}
            onChange={handleChange}
            className={invalid}
          />
        </Col>
      </Form.Group>
    </Col>
  );
}

export default ScoopOptions;
