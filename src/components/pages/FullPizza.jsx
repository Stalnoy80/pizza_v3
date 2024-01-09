import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from '../Header';

const FullPizza = () => {
  const [pizza, setPizza] = useState();
  const { id } = useParams();
  useEffect(() => {
    async function fetchPizza() {
      try {
        const data = await axios.get(`https://813cecfc1deed960.mokky.dev/items/${id}`);
        setPizza(data.data);
      } catch (error) {
        alert('Ошибка при получении пиццы');
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
            <h3>{pizza.price}</h3>
          </div>
        </div>
      </div>
    );
};

export default FullPizza;
