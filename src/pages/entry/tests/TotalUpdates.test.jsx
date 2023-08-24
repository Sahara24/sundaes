import { screen, render } from "../../../test-utils/testing-library-utils";
import Options from "../Options";
import userEvent from "@testing-library/user-event";
import OrderEntry from "../OrderEntry";
import { BrowserRouter } from "react-router-dom";

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

describe("grand total", () => {
  test("Grand total starts at $0.00", () => {
    const { unmount } = render(
      <BrowserRouter>
        <OrderEntry />
      </BrowserRouter>
    );
    const totalHeading = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });
    expect(totalHeading).toHaveTextContent("$0.00");
    unmount();
  });
  test("Grand total updates properly if scoops are added first", async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <OrderEntry />
      </BrowserRouter>
    );
    const totalHeading = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });
    const vanillaScoop = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    const chocoScoop = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    });
    await user.clear(vanillaScoop);
    await user.type(vanillaScoop, "1");
    expect(totalHeading).toHaveTextContent("2.00");

    await user.type(chocoScoop, "1");
    expect(totalHeading).toHaveTextContent("4.00");
  });
  test("Grand total updates properly if topping is added first", async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <OrderEntry />
      </BrowserRouter>
    );
    const totalHeading = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });
    const mochiTopping = await screen.findByRole("checkbox", { name: "Mochi" });
    const cherryTopping = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    await user.click(mochiTopping);
    expect(totalHeading).toHaveTextContent("1.50");
    await user.click(cherryTopping);
    expect(totalHeading).toHaveTextContent("3.00");
  });
  test("Grand total updates properly if item is removed", async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <OrderEntry />
      </BrowserRouter>
    );
    const totalHeading = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });
    const vanillaScoop = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    const mochiTopping = await screen.findByRole("checkbox", { name: "Mochi" });
    await user.clear(vanillaScoop);
    await user.type(vanillaScoop, "1");
    expect(totalHeading).toHaveTextContent("2.00");
    await user.click(mochiTopping);
    expect(totalHeading).toHaveTextContent("3.50");
    await user.clear(vanillaScoop);
    expect(totalHeading).toHaveTextContent("1.50");
    await user.click(mochiTopping);
    expect(totalHeading).toHaveTextContent("0.00");
  });
});
