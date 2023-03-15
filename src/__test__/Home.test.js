import { screen, render as rtlRender } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "../store";
import Home from "../container/Home";

const render = (component) =>
  rtlRender(
    <Provider store={store}>
      <Router>{component}</Router>
    </Provider>
  );
async function getFirstUserName() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();
  return data[0].name;
}

describe("Home Page Component", () => {
  test("renders welcome message and logout button", () => {
    render(<Home />);
    const welcomeMessage = screen.getByText(/welcome/i);
    expect(welcomeMessage).toBeInTheDocument();
    const logoutButton = screen.getByText(/logout/i);
    expect(logoutButton).toBeInTheDocument();
  });
  test("returns the name of the first users", async () => {
    const name = await getFirstUserName(); // Run the function
    expect(name).toEqual("Leanne Graham"); // Make an assertion on the result
  });
  test.each([
    { routeName: "Home", routePath: "/", headingMatch: /welcome/i },
    1,
  ])(
    "$routeName page does not redirect to login screen",
    ({ routePath, headingMatch }) => {
      render(<Home />, { routeHistory: [routePath] });
      const homeHeading = screen.getByRole("heading", { name: headingMatch });
      expect(homeHeading).toBeInTheDocument();
    }
  );
});
