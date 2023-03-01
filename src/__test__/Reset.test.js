import { screen, render as rtlRender } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "../store";
import Reset from "../container/Reset";

const render = (component) =>
  rtlRender(
    <Provider store={store}>
      <Router>{component}</Router>
    </Provider>
  );

describe("Forgot Password (Reset) component", () => {
  test("should be initially email field is empty", () => {
    render(<Reset />);
    const email = screen.getByLabelText(/email address/i);
    expect(email.value).toBe("");
  });
  test("should be show error message if email filled not filled directally submitting button", () => {
    render(<Reset />);
    const email = screen.getByLabelText(/email address/i);
    expect(email.value).toBe("");
    const button = screen.getByRole("button", { name: /submit/i });
    userEvent.click(button);
    const errorMessage = screen.getByText(
      /Please the enter the registered email id/i
    );
    expect(errorMessage).toBeInTheDocument();
  });
  test("should be navigate to login page when click on the back button", () => {
    render(<Reset />);
    const button = screen.getByTestId("backbutton");
    userEvent.click(button);
    expect(window.location.pathname).toBe("/");
  });
  test("should be navigate to create page when user click register link", () => {
    render(<Reset />);
    const link = screen.getByTestId("registerbutton");
    userEvent.click(link);
    expect(window.location.pathname).toBe("/create");
  });
});
