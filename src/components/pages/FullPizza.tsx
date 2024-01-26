import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from '../Header';
import Home from './Home';

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const data = await axios.get(`https://813cecfc1deed960.mokky.dev/items/${id}`);
        setPizza(data.data);
      } catch (error) {
        alert('Ошибка при получении пиццы');
        navigate('/');
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return 'Загрузка';
  } else
    return (
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="content_margin">
            <img src={pizza.imageUrl} alt="" />

            <h2>{pizza.title} </h2>
            <h3>{pizza.price} ₽</h3>
            <Link to="/">
              <button className="button button--outline button--add">Назад</button>
            </Link>
          </div>
        </div>
      </div>
    );
};

export default FullPizza;
