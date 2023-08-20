import React, { useEffect, useState } from "react";
import ScoopOptions from "./ScoopOptions";
import { Row } from "react-bootstrap";
import ToppingOption from "./ToppingOption";
import AlertBanner from "../common/AlertBanner";
import { pricePerItem } from "../../constants";
import { formatCurrency } from "../../utilities";
import { useOrderDetails } from "../../contexts/OrderDetails";

function Options({ optionType }) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const { totals } = useOrderDetails();
  //optionType can only be scoops or toppings

  useEffect(() => {
    const getOptions = async () => {
      await fetch(`http://localhost:3030/${optionType}`)
        .then((res) => {
          return res.json();
        })
        .then((options) => {
          setData(options);
        })
        .catch((err) => {
          setError(true);
        });
    };
    getOptions();
  }, [optionType]);

  const ItemComponent = optionType === "scoops" ? ScoopOptions : ToppingOption;

  const arr = data?.map((item) => (
    <ItemComponent
      key={item.name}
      name={item?.name}
      imagePath={item?.imagePath}
    />
  ));

  if (error) {
    return <AlertBanner />;
  }

  return (
    <>
      <h2 className="text-capitalize">{optionType}</h2>
      <p>{formatCurrency(pricePerItem[optionType])} each</p>
      <p>
        {optionType} total: {formatCurrency(totals[optionType])}
      </p>
      <Row>{arr}</Row>
    </>
  );
}

export default Options;
