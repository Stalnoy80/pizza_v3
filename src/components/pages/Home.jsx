import React, { useContext, useEffect, useState } from 'react';
import qs from 'qs';
import PizzaBlock from '../PizzaBlock/';
import Sceleton from '../PizzaBlock/Sceleton';
import Categories from '../Categories';
import Sort from '../Sort';
import Pagination from '../Pagination';
import { SearchContext } from '../../App';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilters } from '../../redux/slices/filterSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);

  const dispatch = useDispatch();

  const onChangeCategory = (i) => {
    dispatch(setCategoryId(i));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const sortBy = sort.sortProperty;
  const category = categoryId > 0 ? `category=${categoryId}` : '';
  const search = searchValue ? `&title=*${searchValue}*` : '';

  const pizzas = items
    // .filter((obj) => obj.title.toLowerCase().includes(searchValue.toLowerCase())) //фильтрация статики
    .map((obj, i) => <PizzaBlock {...obj} key={i} />);
  const sceletons = [...new Array(6)].map((_, index) => <Sceleton key={index} />); //генерация фэйкового массива пицц

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      dispatch(
        setFilters({
          ...params,
        }),
      );
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(
        `https://813cecfc1deed960.mokky.dev/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}${search}`,
      )
      .then((res) => {
        setItems(res.data.items);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [category, sortBy, search, currentPage]);

  useEffect(() => {
    const queryString = qs.stringify({
      sort: sort.sortProperty,
      categoryId,
      currentPage,
    });

    navigate(`?${queryString}`);
  }, [category, sortBy, search, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={(i) => onChangeCategory(i)} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? sceletons : pizzas}</div>
      <Pagination onChangePage={onChangePage} currentPage={currentPage} />
    </div>
  );
};
export default Home;
