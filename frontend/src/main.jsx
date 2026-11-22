// main.jsx - the entry point of the React app.
// It puts <App /> inside the <div id="root"> from index.html.

import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./style.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* BrowserRouter must wrap the whole app so routing works everywhere */}
    <BrowserRouter>
      <App></App>
    </BrowserRouter>
  </StrictMode>
);
