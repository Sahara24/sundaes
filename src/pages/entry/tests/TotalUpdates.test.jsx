import { screen, render } from "../../../test-utils/testing-library-utils";
import Options from "../Options";
import userEvent from "@testing-library/user-event";

test("update scoop subtotal when scoops changes", async () => {
  const user = userEvent.setup();
  render(<Options optionType="scoops" />);

  //make sure total starts at $0.00
  const scoopSubtotal = screen.getByText("scoops total: $", { exact: false });
  expect(scoopSubtotal).toHaveTextContent("0.00");

  //Update vanilla scoops to 1 and check subtotal
  const vanillaScoop = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaScoop);
  await user.type(vanillaScoop, "1");
  expect(scoopSubtotal).toHaveTextContent("2.00");

  // Update chocolate scoop and check subtotal
  const chocoScoop = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  await user.clear(chocoScoop);
  await user.type(chocoScoop, "1");
  expect(scoopSubtotal).toHaveTextContent("4.00");
});

test("update topping subtotal when topping changes", async () => {
  const user = userEvent.setup();
  render(<Options optionType="toppings" />);

  const toppingSubtotal = screen.getByText("toppings total: $", {
    exact: false,
  });
  expect(toppingSubtotal).toHaveTextContent("0.00");

  const peanutTopping = await screen.findByRole("checkbox", {
    name: "Peanut butter cups",
  });
  await user.click(peanutTopping);
  expect(peanutTopping).toBeChecked();
  expect(toppingSubtotal).toHaveTextContent("1.50");

  const mochiTopping = await screen.findByRole("checkbox", {
    name: "Mochi",
  });
  await user.click(mochiTopping);
  expect(mochiTopping).toBeChecked();
  expect(toppingSubtotal).toHaveTextContent("3.00");

  await user.click(peanutTopping);
  expect(peanutTopping).not.toBeChecked();
  expect(toppingSubtotal).toHaveTextContent("1.50");
});
