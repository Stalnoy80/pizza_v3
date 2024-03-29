import React, { memo } from 'react';
type CategoriesProps = {
  value: number;
  onChangeCategory: (id: number) => void;
};

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

const Categories: React.FC<CategoriesProps> = memo(({ value, onChangeCategory }) => {
  console.log('Categories render');
  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, id) => (
          <li
            onClick={() => onChangeCategory(id)}
            key={id}
            className={value === id ? 'active' : ''}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Categories;
