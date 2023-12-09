import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Cart from './components/pages/Cart';

import { Provider } from 'react-redux';
import { store } from './redux/store';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from './components/NotFoundBlock/';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Provider store={store}>
        <App />
      </Provider>
    ),
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
