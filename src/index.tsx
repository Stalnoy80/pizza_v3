import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Cart from './components/pages/Cart';

import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from './components/NotFoundBlock';
import FullPizza from './components/pages/FullPizza';
import { PersistGate } from 'redux-persist/integration/react';

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
  {
    path: 'FullPizza/:id',
    element: <FullPizza />,
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
