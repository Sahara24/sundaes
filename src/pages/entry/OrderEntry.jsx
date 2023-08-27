import React, { useEffect, useState } from "react";
import Options from "./Options";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utilities";
import { useNavigate } from "react-router";

const OrderEntry = () => {
  const navigate = useNavigate();
  const { totals } = useOrderDetails();
  const total = totals.scoops + totals.toppings;
  const orderDisabled = totals?.scoops === 0;
  return (
    <>
      <div>
        <Options optionType="scoops" />
        <Options optionType="toppings" />
        <h2>Grand Total: {formatCurrency(total)}</h2>
        <button
          disabled={orderDisabled}
          onClick={() => {
            if (total >= 2.0) {
              navigate("/order-summary");
            }
          }}
        >
          Order Sundae!
        </button>
      </div>
    </>
  );
};

export default OrderEntry;
