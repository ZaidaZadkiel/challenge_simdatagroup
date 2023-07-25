import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createHashRouter,
  IndexRouteObject,
  RouteObject,
  RouterProvider
} from "react-router-dom";

import App from './App.tsx'
import Caso1 from './practicas/Caso1.tsx';
import Caso2 from './practicas/Caso2.tsx';
import Caso3 from './practicas/Caso3.tsx';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const routelist : RouteObject[] = [
  {
    path: '/',
    element: <App/>,
    errorElement: <div>Error</div>,
    children: [
      {
        path: "caso1",
        index: true,
        element: <Caso1/>
      },
      {
        path: "caso2",
        element: <Caso2/>
      },
      {
        path: "caso3",
        element: <Caso3/>
      },
    ]
  },
];

const router = createHashRouter(routelist);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
