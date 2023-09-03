import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { useNavigate } from "react-router";
import AlertBanner from "../common/AlertBanner";

const popover = (
  <Popover id="popover-basic">
    <Popover.Body>No ice cream will actually be delivered</Popover.Body>
  </Popover>
);

const SummaryForm = ({ handleOrderNumber }) => {
  const navigate = useNavigate();
  const [disable, setDisable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  async function confirmOrder() {
    setIsLoading(() => true);
    try {
      const response = await fetch(`http://localhost:3030/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      handleOrderNumber(result?.orderNumber);
      setIsLoading(() => false);
      navigate("/thankyou");
      console.log(result);
    } catch (error) {
      console.log(error);
      setError(error);
      setIsLoading(() => false);
    }
  }
  if (error) {
    return <AlertBanner message={error.orderNumber} />;
  }
  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
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
          <Button
            variant="primary"
            type="submit"
            disabled={disable}
            onClick={(e) => {
              e.preventDefault();
              confirmOrder();
            }}
          >
            Confirm order
          </Button>
        </Form>
      )}
    </>
  );
};

export default SummaryForm;
