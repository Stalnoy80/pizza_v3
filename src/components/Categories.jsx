import React, { useState } from 'react';

const Categories = () => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  const [activeCategory, setActiveCategory] = useState(0);
  const onClickActive = (id) => setActiveCategory(id);
  console.log(activeCategory);

  return (
    <div className="categories">
      <ul>
        {categories.map((items, id) => (
          <li
            onClick={() => onClickActive(id)}
            key={id}
            className={activeCategory === id ? 'active' : ''}>
            {items}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
