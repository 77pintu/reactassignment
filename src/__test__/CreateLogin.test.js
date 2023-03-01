import { screen, render as rtlRender } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { store } from "../store";

import { BrowserRouter as Router } from "react-router-dom";
import CreateLogin from "../container/CreateLogin";
const render = (component) =>
  rtlRender(
    <Provider store={store}>
      <Router>{component}</Router>
    </Provider>
  );

describe("Create component", () => {
  test("should be initial name field is empty", () => {
    render(<CreateLogin />);
    const name = screen.getByLabelText(/name/i);
    expect(name.value).toBe("");
  });
  test("should be initial email field is empty", () => {
    render(<CreateLogin />);
    const email = screen.getByLabelText(/email address/i);
    expect(email.value).toBe("");
  });
  test("should be initial password field is empty", () => {
    render(<CreateLogin />);
    const password = screen.getByLabelText(/password/i);
    expect(password.value).toBe("");
  });

  test("should be name required", () => {
    render(<CreateLogin />);
    const name = screen.getByLabelText(/name/i);
    userEvent.type(name, "pintu");
    expect(name).toBeInTheDocument("pintu");
  });
  test("should be able to type an email", () => {
    render(<CreateLogin />);
    const emailInputElement = screen.getByRole("textbox", {
      name: /email address/i,
    });
    userEvent.type(emailInputElement, "abc@gmail.com");
    expect(emailInputElement.value).toBe("abc@gmail.com");
  });
  test("should be able to type a password", () => {
    render(<CreateLogin />);
    const passwordInputElement = screen.getByLabelText(/password/i);
    userEvent.type(passwordInputElement, "abc@@#4973");
    expect(passwordInputElement.value).toBe("abc@@#4973");
  });
  test("should be navigate to the login page once successful registration done", () => {
    render(<CreateLogin />);
    const button = screen.getByText("Register");
    userEvent.click(button);
    expect(window.location.pathname).toBe("/");
  });
});
