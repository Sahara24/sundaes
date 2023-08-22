import React from "react";
import Options from "./Options";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utilities";

const OrderEntry = () => {
  const { totals } = useOrderDetails();
  const total = totals.scoops + totals.toppings;
  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand Total: {formatCurrency(total)}</h2>
    </div>
  );
};

export default OrderEntry;
