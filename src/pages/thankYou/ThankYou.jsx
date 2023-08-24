import React from "react";
import { useNavigate } from "react-router";
import { useOrderDetails } from "../../contexts/OrderDetails";

const ThankYou = ({ orderNumber }) => {
  const navigate = useNavigate();
  const { resetOrder } = useOrderDetails();
  return (
    <div>
      <h2>Thank You!</h2>
      <p>Your order number is {orderNumber}</p>
      <p>As per our terms and conditions nothing will happen now</p>
      <button
        onClick={() => {
          resetOrder();
          navigate("/");
        }}
      >
        Create new order
      </button>
    </div>
  );
};

export default ThankYou;
