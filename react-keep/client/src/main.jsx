import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import "./assets/css/fontawesome.css";
import "./assets/css/bootstrap.css";
import "./assets/css/style.css";
import "./assets/js/bootstrap.bundle.min.js";

import { Provider } from "react-redux";
import store from "./store/index.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
