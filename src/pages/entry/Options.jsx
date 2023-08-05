import React, { useEffect, useState } from "react";
import ScoopOptions from "./ScoopOptions";
import { Row } from "react-bootstrap";
import ToppingOption from "./ToppingOption";
import AlertBanner from "../common/AlertBanner";

function Options({ optionType }) {
  const [data, setData] = useState();
  const [error, setError] = useState(false);
  //optionType can only be scoops or toppings

  useEffect(() => {
    const getOptions = async () => {
      await fetch(`http://localhost:3030/${optionType}`)
        .then((res) => {
          return res.json();
        })
        .then((options) => {
          console.log(options);
          setData(options);
        })
        .catch((err) => {
          console.log(err);
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

  return <Row>{arr}</Row>;
}

export default Options;
