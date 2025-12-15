import React from 'react';
import './index.scss';

export interface CategoryOption {
  label: string;
  value: string;
}

export interface CategoryGroup {
  header: string;
  options: CategoryOption[];
}

interface CompetitionFilterProps {
  categories: CategoryGroup[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CompetitionFilter: React.FC<CompetitionFilterProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
}) => {
  const cateWidth = `${100 / categories.length}%`;
  return (
    <div className="competition-filter">
      <div className="betting-categories">
        <div className="betting-cate-empty"></div>
        <div className="betting-cate-main">

          {categories.map((category) => (
            <div key={category.header} className="category-group" style={{ width: cateWidth }}>
              <div className="category-header">{category.header}</div>
              <div className="category-options">
                {category.options.map((option) => (
                  <span
                    key={option.value}
                    className="category-option"
                  >
                    {option.label}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
