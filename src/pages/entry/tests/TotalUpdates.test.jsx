import { screen, render } from "@testing-library/react";
import Options from "../Options";
import userEvent from "@testing-library/user-event";
import { OrderDetailsProvider } from "../../../contexts/OrderDetails";

test("update scoop subtotal when scoops changes", async () => {
  const user = userEvent.setup();
  render(<Options optionType="scoops" />, { wrapper: OrderDetailsProvider });

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
