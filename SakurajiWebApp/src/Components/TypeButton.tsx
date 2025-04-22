import React from 'react';

interface TypeButtonProps {
    setClaseFondo: (value: string) => void;
    setType: (value: string) => void;
    filter: string;
    isSelected:boolean
    
}

function TypeButton({ setClaseFondo, setType, filter,isSelected}: TypeButtonProps) {
    const className = `${filter.toLowerCase()} ${isSelected ? 'is-selected' : ''}`;
  return (
    <button
      onClick={() => {
        setClaseFondo(filter.toLowerCase());
        setType(filter);
      }}
      className={`${className} tipos`}
    >
      {filter}
    </button>
  );
}

export default TypeButton;