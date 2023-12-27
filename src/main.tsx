import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import "./index.css";
import { RouterProvider, BrowserRouter, Routes, Route } from "react-router-dom";
import router from "./components/routes";
import theme from "./theme";
import { AuthProvider } from "./context/AuthProvider";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="/*"
            element={
              <ChakraProvider theme={theme}>
                <ColorModeScript
                  initialColorMode={theme.config.initialColorMode}
                />
                <App></App>
              </ChakraProvider>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
