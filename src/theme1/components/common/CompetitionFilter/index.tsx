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
  viewMode?: 'list' | 'grid' | 'default';
}

export const CompetitionFilter: React.FC<CompetitionFilterProps> = ({
  categories,
  viewMode = 'default',
}) => {
  // Filter categories based on viewMode
  const filteredCategories = React.useMemo(() => {
    if (viewMode === 'list') {
      return categories.filter(cat => cat.header === 'WINNING');
    } else if (viewMode === 'default') {
      const winning = categories.find(cat => cat.header === 'WINNING');
      const totals = categories.find(cat => cat.header === 'TOTALS');
      const result: CategoryGroup[] = [];
      if (winning) result.push(winning);
      if (totals) result.push(totals);
      return result;
    } else {
      const winning = categories.find(cat => cat.header === 'WINNING');
      const handicap = categories.find(cat => cat.header === 'HANDICAP');
      const totals = categories.find(cat => cat.header === 'TOTALS');
      const result: CategoryGroup[] = [];
      if (winning) result.push(winning);
      if (handicap) result.push(handicap);
      if (totals) result.push(totals);
      return result;
    }
  }, [categories, viewMode]);

  const cateWidth = filteredCategories.length > 0 ? `${100 / filteredCategories.length}%` : '100%';
  
  return (
    <div className="competition-filter">
      <div className="betting-categories">
        <div className="betting-cate-empty"></div>
        <div className="betting-cate-main">
          {filteredCategories.map((category) => (
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
