import { render, screen } from "../../../test-utils/testing-library-utils";
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
  const nullPopOver = screen.queryByText(
    /no ice cream will actually be delivered/i
  );

  expect(nullPopOver).not.toBeInTheDocument();

  //popover appears on mouseover of checkbox
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  expect(termsAndConditions).toBeInTheDocument();
  await user.hover(termsAndConditions);
  const popOver = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popOver).toBeInTheDocument();
  //popover disappears when mouse is out
  await user.unhover(termsAndConditions);
  expect(popOver).not.toBeInTheDocument();
});
