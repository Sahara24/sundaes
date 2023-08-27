import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Col } from "react-bootstrap";
import { useOrderDetails } from "../../contexts/OrderDetails";

function ScoopOptions({ name, imagePath }) {
  const { updateItemCount } = useOrderDetails();
  const [invalid, setInvalid] = useState(false);
  const handleChange = (e) => {
    if (e.target.value < 0) {
      setInvalid(() => true);
      return;
    } else {
      setInvalid(() => false);
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
        <Col xs="6" style={{ textAlign: "left" }}>
          <Form.Control
            type="number"
            defaultValue={0.0}
            onChange={handleChange}
            isInvalid={invalid}
          />
        </Col>
      </Form.Group>
    </Col>
  );
}

export default ScoopOptions;
