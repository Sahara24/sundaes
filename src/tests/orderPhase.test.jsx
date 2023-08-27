import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { BrowserRouter } from "react-router-dom";

test("Order Phases for happy path", async () => {
  const user = userEvent.setup();
  const { unmount } = render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const mintScoop = await screen.findByRole("spinbutton", {
    name: "Mint chip",
  });
  const mochiTopping = await screen.findByRole("checkbox", { name: "Mochi" });
  const orderSundaeBtn = screen.getByRole("button", {
    name: /Order Sundae!$/i,
  });
  await user.clear(mintScoop);
  await user.type(mintScoop, "1");
  await user.click(mochiTopping);
  await user.click(orderSundaeBtn);

  const termsAndConditions = screen.getByRole("checkbox", {
    name: "I agree to Terms and Conditions",
  });
  const confirmOrderBtn = screen.getByRole("button", {
    name: /Confirm order$/i,
  });
  await user.click(termsAndConditions);
  await user.click(confirmOrderBtn);

  const loading = await screen.findByText("Loading...");
  expect(loading).toBeInTheDocument();

  const thankYouText = await screen.findByRole("heading", {
    name: "Thank You!",
  });
  const noLoader = screen.queryByText("Loading...");
  expect(noLoader).not.toBeInTheDocument();
  expect(thankYouText).toBeInTheDocument();
  const orderNumber = screen.getByText("Your order number", { exact: false });
  expect(orderNumber).toBeInTheDocument();

  const newOrder = await screen.findByRole("button", {
    name: "Create new order",
  });
  await user.click(newOrder);

  const scoopsTotal = await screen.findByText("scoops total: $0.00");
  const toppingTotal = await screen.findByText("toppings total: $0.00");
  expect(scoopsTotal).toBeInTheDocument();
  expect(toppingTotal).toBeInTheDocument();
  unmount();
});
