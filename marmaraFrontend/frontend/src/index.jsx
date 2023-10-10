import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./components/Contexts/AuthContext";
import { AuthzProvider } from "./components/Contexts/AuthzContext";
import { ThemeProvider } from "./components/Contexts/ThemeContext";
import { LocationProvider } from "./components/Contexts/LocationContext";
import { HamburgerMenuProvider } from "./components/Contexts/HamburgerMenuContext";
import { AllFiltersProvider } from "./components/Contexts/AllFilters";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <AuthzProvider>
        <ThemeProvider>
          <BrowserRouter>
            <LocationProvider>
              <HamburgerMenuProvider>
                <AllFiltersProvider>
                  <App />
                </AllFiltersProvider>
              </HamburgerMenuProvider>
            </LocationProvider>
          </BrowserRouter>
        </ThemeProvider>
      </AuthzProvider>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
