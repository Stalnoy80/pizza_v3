import React, { useEffect, useState } from 'react';

import PizzaBlock from '../PizzaBlock/';
import Sceleton from '../PizzaBlock/Sceleton';
import Categories from '../Categories';
import Sort from '../Sort';

const Home = () => {
  const MyContext = React.createContext();
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({ name: 'популярности', sortProperty: 'rating' });

  console.log(sortType.sortProperty);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://813cecfc1deed960.mokky.dev/items?${
        categoryId > 0 ? `category=${categoryId}` : ''
      }&sortBy=${sortType.sortProperty}`,
    )
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType]);

  return (
    <MyContext.Provider value={''}>
      <div className="container">
        <div className="content__top">
          <Categories value={categoryId} onChangeCategory={(i) => setCategoryId(i)} />
          <Sort value={sortType} onChangeSort={(i) => setSortType(i)} />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {isLoading
            ? [...new Array(6)].map((_, index) => <Sceleton key={index} />) //генерация фэйкового массива пицц
            : items.map((obj, i) => <PizzaBlock {...obj} key={i} />)}
        </div>
      </div>
    </MyContext.Provider>
  );
};

export default Home;
