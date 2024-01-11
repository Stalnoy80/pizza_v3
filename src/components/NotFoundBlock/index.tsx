import React from 'react';

import styles from './NotFoundBlock.module.scss';
import Header from '../Header';

const NotFoundBlock: React.FC = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className={styles.root}>
        <h1>
          <span>😁</span>
          <br /> Ничего не найдено!
        </h1>
        <p className={styles.description}>К сожалению данная страница отсутствует </p>
      </div>
    </div>
  );
};

export default NotFoundBlock;
