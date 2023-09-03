import {
  render,
  screen,
  waitFor,
} from "../../test-utils/testing-library-utils";
import { server } from "../../mocks/server";
import { rest } from "msw";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import SummaryForm from "../summary/SummaryForm";
test("Order confirmation API response test", async () => {
  const user = userEvent.setup();
  server.resetHandlers(
    rest.post("http://localhost:3030/order", (req, res, ctx) =>
      res(ctx.status(500))
    )
  );
  render(
    <BrowserRouter>
      <SummaryForm />
    </BrowserRouter>
  );

  const checkbox = screen.getByRole("checkbox", {
    name: "I agree to Terms and Conditions",
  });
  await user.click(checkbox);
  const confirmBtn = screen.getByRole("button", {
    name: "Confirm order",
  });
  await user.click(confirmBtn);
  await waitFor(async () => {
    const alert = await screen.findByRole("alert");
    expect(alert).toBeInTheDocument();
  });
});
