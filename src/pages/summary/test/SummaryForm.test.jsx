import { render, screen, fireEvent } from "@testing-library/react";
import SummaryForm from "../SummaryForm";

test("Initial state of checkbox and its functioning", () => {
  render(<SummaryForm />);
  const checkBox = screen.getByRole("checkbox", {
    name: "I agree to Terms and Conditions",
  });
  const confirmtn = screen.getByRole("button", { name: "Confirm order" });
  expect(checkBox).not.toBeChecked();
  expect(confirmtn).toBeDisabled();
  fireEvent.click(checkBox);
  expect(checkBox).toBeChecked();
  expect(confirmtn).toBeEnabled();
});
