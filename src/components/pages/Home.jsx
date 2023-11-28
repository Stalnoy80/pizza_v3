import React, { useEffect, useState } from 'react';

import PizzaBlock from '../PizzaBlock/';
import Sceleton from '../PizzaBlock/Sceleton';
import Categories from '../Categories';
import Sort from '../Sort';
import Pagination from '../Pagination';

const Home = ({ searchValue }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({ name: 'популярности', sortProperty: 'rating' });

  const sortBy = sortType.sortProperty;
  const category = categoryId > 0 ? `category=${categoryId}` : '';
  const search = searchValue ? `&title=*${searchValue}*` : '';

  const pizzas = items
    // .filter((obj) => obj.title.toLowerCase().includes(searchValue.toLowerCase())) //фильтрация статики
    .map((obj, i) => <PizzaBlock {...obj} key={i} />);
  const sceletons = [...new Array(6)].map((_, index) => <Sceleton key={index} />); //генерация фэйкового массива пицц

  console.log(pizzas);

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://813cecfc1deed960.mokky.dev/items?${category}&sortBy=${sortBy}${search}`)
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [category, sortBy, searchValue]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={(i) => setCategoryId(i)} />
        <Sort value={sortType} onChangeSort={(i) => setSortType(i)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? sceletons : pizzas}</div>
      <Pagination />
    </div>
  );
};

export default Home;
