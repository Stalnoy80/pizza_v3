import React, { useEffect, useRef } from 'react';
import qs from 'qs';
import PizzaBlock from '../PizzaBlock';
import Sceleton from '../PizzaBlock/Sceleton';
import Categories from '../Categories';
import SortPopup, { list } from '../Sort';
import Pagination from '../Pagination';
import { useSelector } from 'react-redux';
import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../../redux/slices/filterSlice';
import { useNavigate } from 'react-router-dom';
import { SearchPizzaParams, fetchPizzas, selectPizzaData } from '../../redux/slices/pizzaSlice';
import { useAppDispatch } from '../../redux/store';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isMounted = useRef(false);

  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);

  const isSearch = useRef(false);

  const sortBy = sort.sortProperty.replace('', '');
  const category = categoryId > 0 ? `category=${categoryId}` : '';
  const search = searchValue ? `&title=*${searchValue}*` : '';

  const getPizzas = async () => {
    //@ts-ignore
    dispatch(fetchPizzas({ sortBy, category, search, currentPage: String(currentPage) }));
    window.scroll(0, 0);
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
      const sort = list.find((obj) => obj.sortProperty === params.sortBy);

      dispatch(
        setFilters({
          searchValue: params.search,
          categoryId: Number(params.category),
          currentPage: Number(params.currentPage),
          sort: sort || list[0],
        }),
      );
      isSearch.current = true;
    }
  }, []);

  const onChangeCategory = React.useCallback((index: number) => {
    dispatch(setCategoryId(index));
  }, []);

  const onChangePage = React.useCallback((page: number) => {
    dispatch(setCurrentPage(page));
  }, []);

  const pizzas = items
    // .filter((obj) => obj.title.toLowerCase().includes(searchValue.toLowerCase())) //фильтрация статики
    .map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
  const sceletons = [...new Array(6)].map((_, index) => <Sceleton key={index} />); //генерация фэйкового массива пицц

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sort: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [category, sortBy, search, currentPage]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [category, sortBy, search, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <SortPopup value={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p> Не удалось загрузить пиццы. Попробуйте повторить попытку.</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? sceletons : pizzas}</div>
      )}
      <Pagination onChangePage={onChangePage} currentPage={currentPage} />
    </div>
  );
};
export default Home;
