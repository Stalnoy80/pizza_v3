import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import React from 'react';

const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ './components/pages/Cart'));
const NotFound = React.lazy(
  () => import(/* webpackChunkName: "NotFound" */ './components/pages/NotFound'),
);
const FullPizza = React.lazy(
  () => import(/* webpackChunkName: "FullPizza" */ './components/pages/FullPizza'),
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,

    errorElement: (
      <React.Suspense fallback={<div>Загрузка ...</div>}>
        <NotFound />{' '}
      </React.Suspense>
    ),
  },
  {
    path: 'cart',
    element: (
      <React.Suspense fallback={<div>Загрузка корзины...</div>}>
        <Cart />
      </React.Suspense>
    ),
  },
  {
    path: 'NotFound',
    element: (
      <React.Suspense fallback={<div>Загрузка ...</div>}>
        <NotFound />
      </React.Suspense>
    ),
  },
  {
    path: 'FullPizza/:id',
    element: (
      <React.Suspense fallback={<div>Загрузка ...</div>}>
        <FullPizza />
      </React.Suspense>
    ),
  },
]);

const rootElem = document.getElementById('root');

if (rootElem) {
  const root = ReactDOM.createRoot(rootElem);

  root.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>,
  );
}
