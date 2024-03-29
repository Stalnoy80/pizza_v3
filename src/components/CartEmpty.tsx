import React from 'react';
import cartEmpty from '.././assets/empty-cart.png';
import { Link } from 'react-router-dom';
import Header from './Header';

const CartEmpty: React.FC = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="container container--cart">
        <div className="content">
          <div className="cart cart--empty">
            <h2>
              Корзина пустая <span>😕</span>
            </h2>
            <p>
              Вероятней всего, вы не заказывали ещё пиццу.
              <br />
              Для того, чтобы заказать пиццу, перейди на главную страницу.
            </p>
            <img src={cartEmpty} alt="Empty cart" />
            <Link to="/" className="button button--black">
              <span>Вернуться назад</span>
            </Link>
          </div>{' '}
        </div>{' '}
      </div>{' '}
    </div>
  );
};

export default CartEmpty;
