import React, { useEffect, useState } from "react";
import ScoopOptions from "./ScoopOptions";
import { Row } from "react-bootstrap";

function Options({ optionType }) {
  const [data, setData] = useState();
  //optionType can only be scoops or toppings

  useEffect(() => {
    const getOptions = async () => {
      const response = await fetch(`http://localhost:3030/${optionType}`);
      const options = await response.json();
      console.log(options);
      setData(options);
    };
    getOptions();
  }, [optionType]);

  const ItemComponent = optionType === "scoops" ? ScoopOptions : null;

  const arr = data?.map((item) => (
    <ItemComponent
      key={item.name}
      name={item?.name}
      imagePath={item?.imagePath}
    />
  ));

  return <Row>{arr}</Row>;
}

export default Options;
