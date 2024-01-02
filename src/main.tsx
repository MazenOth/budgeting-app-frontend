import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import theme from "./theme";
import { AuthProvider } from "./context/AuthProvider";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

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
                <QueryClientProvider client={queryClient}>
                  <App />
                </QueryClientProvider>
              </ChakraProvider>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
