import { render, screen } from "@testing-library/react";
import Options from "../Options";

test("display image for each scoop option from server", async () => {
  render(<Options optionType={"scoops"} />);
  //find imgs
  const scoopImgs = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImgs).toHaveLength(2);
  //confirm alt text of imgs
  const altTexts = scoopImgs.map((item) => {
    return item.alt;
  });
  expect(altTexts).toEqual(["Chocolate Scoop", "Vanilla Scoop"]);
});

test("display image for each topping option from server", async () => {
  render(<Options optionType={"toppings"} />);

  const toppingImgs = await screen.findAllByRole("img", { name: /Topping$/i });
  expect(toppingImgs).toHaveLength(6);
  const altTexts = toppingImgs.map((item) => {
    return item.alt;
  });
  expect(altTexts).toEqual([
    "M&Ms Topping",
    "Hot fudge Topping",
    "Peanut butter cups Topping",
    "Gummi bears Topping",
    "Mochi Topping",
    "Cherries Topping",
  ]);
});
