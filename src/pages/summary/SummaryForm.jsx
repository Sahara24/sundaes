import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

const popover = (
  <Popover id="popover-basic">
    <Popover.Body>No ice cream will actually be delivered</Popover.Body>
  </Popover>
);

// const Example = () => (
//   <OverlayTrigger trigger="click" placement="right" overlay={popover}>
//     <Button variant="success">Click me to see</Button>
//   </OverlayTrigger>
// );

const SummaryForm = () => {
  const [disable, setDisable] = useState(true);
  return (
    <Form>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          id="terms-conditions"
          onClick={(e) => {
            setDisable(!e.target.checked);
          }}
          label={
            <>
              I agree to{" "}
              <OverlayTrigger placement="auto" overlay={popover}>
                <span className="text-info">Terms and Conditions</span>
              </OverlayTrigger>
            </>
          }
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={disable}>
        Confirm order
      </Button>
    </Form>
  );
};

export default SummaryForm;
