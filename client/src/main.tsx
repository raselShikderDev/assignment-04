import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./apps/redux/store";
import { RouterProvider } from "react-router-dom";
import { route } from "./apps/router/routers";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={route}>
        <App />
      </RouterProvider>
    </Provider>
  </StrictMode>
);
