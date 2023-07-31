import { render, screen } from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event";

test("Initial state of checkbox and its functioning", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);
  const checkBox = screen.getByRole("checkbox", {
    name: "I agree to Terms and Conditions",
  });
  const confirmtn = screen.getByRole("button", { name: "Confirm order" });
  expect(checkBox).not.toBeChecked();
  expect(confirmtn).toBeDisabled();
  await user.click(checkBox);
  expect(checkBox).toBeChecked();
  expect(confirmtn).toBeEnabled();
});

test("popover responds to hover", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);
  //popover starts out hidden

  //popover appears on mouseover of checkbox

  //popover disappears when mouse is out
});
