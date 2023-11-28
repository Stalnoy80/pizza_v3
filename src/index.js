import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Cart from './components/pages/Cart';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from './components/NotFoundBlock/';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
  },
  {
    path: 'cart',
    element: <Cart />,
  },
  {
    path: 'NotFound',
    element: <NotFound />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);
