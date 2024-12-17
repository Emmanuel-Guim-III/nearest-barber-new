import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { MyMap } from './components/Map';
import { SignUpForm } from './components/SignUpForm';
import ErrorPage from './error-page';
import './index.css';
// import Root from './routes/root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SignUpForm />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'map/',
    element: <MyMap />,
  },
  {
    path: 'signup/',
    element: <SignUpForm />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
