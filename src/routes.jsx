import { createBrowserRouter } from "react-router-dom";
import App from "./Menus/App.jsx";
import Messages from "./Menus/Messages.jsx";
import Journal from "./Menus/Journal.jsx";
import SavedThoughts from "./Menus/SavedJournal.jsx";

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
  }, {
    path: "/journal/saved_thoughts",
    element: <SavedThoughts />
  }
]);