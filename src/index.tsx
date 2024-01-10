import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Cart from './components/pages/Cart';

import { Provider } from 'react-redux';
import { store } from './redux/store';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from './components/NotFoundBlock';
import FullPizza from './components/pages/FullPizza';

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
    element: (
      <Provider store={store}>
        <Cart />
      </Provider>
    ),
  },
  {
    path: 'NotFound',
    element: <NotFound />,
  },
  {
    path: 'FullPizza/:id',
    element: (
      <Provider store={store}>
        <FullPizza />,
      </Provider>
    ),
  },
]);

const rootElem = document.getElementById('root');

if (rootElem) {
  const root = ReactDOM.createRoot(rootElem);
  root.render(<RouterProvider router={router} />);
}
