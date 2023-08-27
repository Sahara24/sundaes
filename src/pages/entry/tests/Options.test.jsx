import { render, screen } from "../../../test-utils/testing-library-utils";
import Options from "../Options";
import userEvent from "@testing-library/user-event";

test("display image for each scoop option from server", async () => {
  render(<Options optionType={"scoops"} />);
  //find imgs
  const scoopImgs = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImgs).toHaveLength(3);
  //confirm alt text of imgs
  const altTexts = scoopImgs.map((item) => {
    return item.alt;
  });
  expect(altTexts).toEqual([
    "Chocolate Scoop",
    "Vanilla Scoop",
    "Mint chip Scoop",
  ]);
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

test("Subtotal update check on invalid input", async () => {
  const user = userEvent.setup();
  render(<Options optionType={"scoops"} />);
  const vanillaScoop = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaScoop);
  await user.type(vanillaScoop, "-2");
  const scoopTotal = screen.getByText("scoops total", { exact: false });
  expect(scoopTotal).toHaveTextContent("$0.00");
  await user.clear(vanillaScoop);
  await user.type(vanillaScoop, "1");
  expect(scoopTotal).toHaveTextContent("$2.00");
});
