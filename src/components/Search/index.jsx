import React, { useCallback, useRef, useState } from 'react';
import styles from './Search.module.scss';
import { useContext } from 'react';
import { SearchContext } from '../../App';
import debounce from 'lodash.debounce';

const Search = () => {
  const [value, setValue] = useState('');
  const { searchValue, setSearchValue } = useContext(SearchContext);
  const inputRef = useRef();

  const updateSearchValue = useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 250),
    [],
  );

  // const onChangeInput = (event) => {
  //   setSearchValue(event.target.value);
  //   testDebounce();
  // };

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  const onClickClear = () => {
    inputRef.current.focus();
    setSearchValue('');
    setValue('');
  };

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width="400"
        height="400"
        viewBox="0 0 400 400">
        <desc>Created with Fabric.js 3.6.2</desc>
        <g transform="matrix(7.14 0 0 7.14 200 200)" id="search">
          <path
            transform=" translate(-16, -16.04)"
            d="M 29.71 28.29 l -6.5 -6.5 l -0.07 0 a 12 12 0 1 0 -1.39 1.39 s 0 0.05 0 0.07 l 6.5 6.5 a 1 1 0 0 0 1.42 0 A 1 1 0 0 0 29.71 28.29 Z M 14 24 A 10 10 0 1 1 24 14 A 10 10 0 0 1 14 24 Z"
            strokeLinecap="round"
          />
        </g>
      </svg>
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Введите пиццу ..."
      />
      {value && (
        <svg
          onClick={onClickClear}
          className={styles.close}
          width="800px"
          height="800px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
            stroke="#000000"
            strokeWidth="2"
          />
          <path d="M9 9L15 15M15 9L9 15" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )}
    </div>
  );
};

export default Search;
