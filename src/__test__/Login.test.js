import { screen, render as rtlRender } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import Login from "../container/Login";
import { store } from "../store";

import { BrowserRouter as Router } from "react-router-dom";
const render = (component) =>
  rtlRender(
    <Provider store={store}>
      <Router>{component}</Router>
    </Provider>
  );

// helper function

describe("Login Component", () => {
  test("should be initial email field is empty", () => {
    render(<Login />);
    const email = screen.getByLabelText(/email address/i);
    expect(email.value).toBe("");
  });
  test("should be initial password field is empty", () => {
    render(<Login />);
    const password = screen.getByLabelText(/password/i);
    expect(password.value).toBe("");
  });
  test("should be valid email required", () => {});
  test("should be able to type an email", () => {
    render(<Login />);
    const emailInputElement = screen.getByRole("textbox", {
      name: /email address/i,
    });
    userEvent.type(emailInputElement, "abc@gmail.com");
    expect(emailInputElement.value).toBe("abc@gmail.com");
  });
  test("should be able to type a password", () => {
    render(<Login />);
    const passwordInputElement = screen.getByLabelText(/password/i);
    userEvent.type(passwordInputElement, "abc@@#4973");
    expect(passwordInputElement.value).toBe("abc@@#4973");
  });

  test("should be  required to click the login button", () => {
    render(<Login />);
    const loginButton = screen.getByTestId("user-login");
    expect(loginButton).toBeInTheDocument();
  });
  test("should be required to click the forgot password button", () => {
    render(<Login />);
    const forgotPasswordButton = screen.getByTestId("user-forgot-password");
    expect(forgotPasswordButton).toBeInTheDocument();
  });

  test("navigates to register page when register button is clicked", () => {
    render(<Login />);
    const link = screen.getByText(/register/i);
    // Use the act function to simulate a click event
    userEvent.click(link);
    // Assert that the component navigated to the correct page
    expect(window.location.pathname).toBe("/create");
  });
  test("should navigate to once login successful", () => {
    render(<Login />);
    const email = screen.getByLabelText(/email address/i);
    userEvent.type(email, "birajdarmp@gmail.com");
    expect(email.value).toBe("birajdarmp@gmail.com");
    const password = screen.getByLabelText(/password/i);
    userEvent.type(password, "abc@1245$#");
    expect(password.value).toBe("abc@1245$#");
    const loginButton = screen.getByTestId("user-login");
    userEvent.click(loginButton);
    expect(window.location.pathname).toBe("/home");
  });
  test("should be text present  user not have account", () => {
    render(<Login />);
    const text = screen.getByTestId("userdon'tacccounttext");
    expect(text).toBeInTheDocument("Don't have Account?");
  });
});
