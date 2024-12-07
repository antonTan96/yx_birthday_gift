import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Incrementer from "./Incrementer.jsx";
import GetFile from "./GetFile.jsx";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  }, {
    path: "/increment",
    element: <Incrementer />
  }, {
    path: "/file",
    element: <GetFile />
  }
]);