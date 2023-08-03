import { render, screen } from "@testing-library/react";
import Options from "../Options";

test("display image for each scoop option from server", async () => {
  render(<Options optionType={"scoops"} />);
  //find imgs
  const scoopImgs = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImgs).toHaveLength(2);
  //confirm alt text of imgs
  const altTexts = scoopImgs.map((item) => {
    console.log(item);
    return item.alt;
  });
  console.log(altTexts);
  expect(altTexts).toEqual(["Chocolate Scoop", "Vanilla Scoop"]);
});
