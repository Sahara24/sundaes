import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import ScoopOptions from "../ScoopOptions";
test("input box turns red on Invalid inputs", async () => {
  const user = userEvent.setup();
  render(<ScoopOptions name={"Vanilla"} />);
  const vanillaScoop = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaScoop);
  await user.type(vanillaScoop, "-1");
  expect(vanillaScoop).toHaveClass("is-invalid");

  await user.clear(vanillaScoop);
  await user.type(vanillaScoop, "12");
  expect(vanillaScoop).not.toHaveClass("is-invalid");
});
