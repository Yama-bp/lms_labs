import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';
import Main from "./main/Main";
import List from "./list/List";
import GamePage from "./game/GamePage";
import ChartPage from "./chart/ChartPage";
import Testing from "./testing/Testing";

const router = createBrowserRouter([
  { path: "/", element: <Main /> },
  { path: "/list", element: <List /> },
  { path: "/game/:id", element: <GamePage /> },
  { path: "/chart", element: <ChartPage /> },
  { path: "/testing", element: <Testing /> },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);