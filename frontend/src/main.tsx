import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { RootRoute, Route, Router, RouterProvider } from "@tanstack/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import WalletPage from "./pages/WalletPage";
import AddWalletPage from "./pages/AddWalletPage";

const rootRoute = new RootRoute();

const loginRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});
const registerRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: RegisterPage,
});
const walletRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/wallet",
  component: WalletPage,
});
const addWalletRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/add-wallet",
  component: AddWalletPage,
});

const routeTree = rootRoute.addChildren([
  loginRoute,
  registerRoute,
  walletRoute,
  addWalletRoute,
]);

const router = new Router({ routeTree });

declare module "@tanstack/router" {
  interface Register {
    router: typeof router;
  }
}

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
