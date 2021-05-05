import { React, ReactDOM, BrowserRouter } from "../dep.ts";
import App from "../components/App.tsx";

ReactDOM.hydrate(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);