import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createHashRouter,
  RouteObject,
  RouterProvider
} from "react-router-dom";

import App from './App.tsx'
import Info from './Info.tsx';
import Caso1 from './practicas/Caso1';
import Caso2 from './practicas/Caso2';
import Caso3 from './practicas/Caso3';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { GlassView } from './practicas/Caso2/GlassView.tsx';

const routelist : RouteObject[] = [
  {
    path: '/',
    element: <App/>,
    errorElement: <div>Error</div>,
    children: [
      {
        index: true,
        element: <Info/>
      },
      {
        path: "caso1",
        element: <Caso1/>
      },
      {
        path: "caso2/*",
        element: <Caso2/>,
        // children: [
        //   {
        //     path:'',
        //     index: true,
        //     element: <div>index caso2</div>
        //   },
        //   {
        //     path:'view',
        //     element: <GlassView/>
        //   }
        // ]
      },
      {
        path: "caso3",
        element: <Caso3/>
      },
    ],
  },
];

const router = createHashRouter(routelist);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
