import React from "react";
import ReactDOM from "react-dom/client";
import "normalize.css"; // Normal CSS used for cross browser consistency in default styling of HTML elements.
import "./index.css"; // Default Global styles / custom css file
import App from "./App";
import { AppProvider } from "./context/appContext"; // Imported to wrap entire application so that context can be used anywhere.

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);
