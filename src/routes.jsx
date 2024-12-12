import { createBrowserRouter } from "react-router-dom";
import App from "./Menus/App.jsx";
import Messages from "./Menus/Messages.jsx";
import Journal from "./Menus/Journal.jsx";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  }, {
    path: "/messages",
    element: <Messages />
  }, {
    path: "/journal",
    element: <Journal />
  }
]);