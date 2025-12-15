import React, { useState } from 'react';
import { useClickOutside } from '@/theme1/hooks/useClickOutside';
import './index.scss';

export interface DropdownItem {
  label: string;
  value: string | number;
}

interface DropdownProps {
  items: DropdownItem[];
  selectedValue?: string | number;
  onSelect: (value: string | number) => void;
  width?: string | number;
  color: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  items,
  selectedValue,
  onSelect,
  width,
  color
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useClickOutside<HTMLDivElement>(() => {
    setIsOpen(false);
  });

  // Get the selected item or default to first item
  const selectedItem = items.find(item => item.value === selectedValue) || items[0];
  const displayLabel = selectedItem?.label || '';

  const handleItemClick = (item: DropdownItem) => {
    onSelect(item.value);
    setIsOpen(false);
  };

  const widthStyle = width ? { width: typeof width === 'number' ? `${width}px` : width } : {};
  const backGroundStyle = { background: color };

  return (
    <div className={`dropdown-wrapper h-full`} ref={dropdownRef}>
      {/* Title/Trigger Div */}
      <div
        className="dropdown-title h-full"
        onClick={() => setIsOpen(!isOpen)}
        style={{ ...widthStyle, ...backGroundStyle }}
      >
        <i className={`bc-i-time`} />
        <span className="dropdown-label">{displayLabel}</span>
        <i className={`bc-i-small-arrow-down dropdown-arrow ${isOpen ? 'open' : ''}`} />

      </div>
      {
        isOpen && (
          <div
            className="dropdown-container"
            style={widthStyle}
          >
            {items.map((item) => (
              <div
                key={item.value}
                className={`dropdown-item ${selectedValue === item.value ? 'active' : ''}`}
                onClick={() => handleItemClick(item)}
              >
                {item.label}
              </div>
            ))}
          </div>
        )
      }
    </div >
  );
};

