import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const SummaryForm = () => {
  const [disable, setDisable] = useState(true);
  return (
    <Form>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          id="terms-conditions"
          onClick={() => {
            setDisable((prev) => !prev);
          }}
          label={
            <>
              I agree to{" "}
              <a
                href="https://www.google.com/"
                target="_blank"
                rel="noreferrer"
              >
                Terms and Conditions
              </a>
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
