import {
  render,
  screen,
  waitFor,
} from "../../../test-utils/testing-library-utils";
import OrderEntry from "../OrderEntry";
import { rest } from "msw";
import { server } from "../../../mocks/server";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

test("handles error for scoops and toppings", async () => {
  server.resetHandlers(
    rest.get("http://localhost/3030/scoops", (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get("http://localhost:3030/toppings", (req, res, ctx) =>
      res(ctx.status(500))
    )
  );
  render(
    <BrowserRouter>
      <OrderEntry />
    </BrowserRouter>
  );
  await waitFor(async () => {
    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(2);
  });
});

test("Disable order button if no scoops", async () => {
  const user = userEvent.setup();
  render(
    <BrowserRouter>
      <OrderEntry />
    </BrowserRouter>
  );
  const scoopsTotal = screen.getByText("scoops total:", { exact: false });
  const vanillaScoop = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  expect(scoopsTotal).toHaveTextContent("$0.00");
  const orderBtn = screen.getByRole("button", { name: "Order Sundae!" });
  expect(orderBtn).toBeDisabled();
  await user.type(vanillaScoop, "1");
  expect(scoopsTotal).toHaveTextContent("$2.00");
  expect(orderBtn).toBeEnabled();
  await user.clear(vanillaScoop);
  expect(orderBtn).toBeDisabled();
});
