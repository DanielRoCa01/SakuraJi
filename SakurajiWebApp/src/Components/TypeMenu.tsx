import React from "react";
import Select from 'react-select';

interface TypeMenuProps {
  types: string[];
  setType: (value: string) => void;
  value: string;
}

function TypeMenu({ types, value, setType }: TypeMenuProps) {
    const newTypes=["Todo"];
    
  const options = types.concat(newTypes).map(type => ({
    value: type,
    label: type.charAt(0).toUpperCase() + type.slice(1)
  }));

  // Busca la opción seleccionada en el array de opciones
  const selectedOption = options.find(option => option.value === value);

  // Maneja el cambio de selección
  const handleOnChange = (option: { value: string; label: string } | null) => {
    if (option) setType(option.value);
  };
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: 180, // ancho fijo en píxeles
      minWidth: 180,
      maxWidth:180,
      backgroundColor: '#f9bec8',  // Cambia aquí el color de fondo que quieras
      borderColor: state.isFocused ? '#302e2e' : '#302e2e', // Opcional: color del borde
      boxShadow: state.isFocused ? '0 0 0 1pxrgb(255, 38, 248)' : null,
      '&:hover': {
        borderColor: '#302e2e',
      },
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? '#302e2e' : '#f9bec8',
      backgroundColor: state.isSelected
      ? '#f9bec8'
      : state.isFocused
      ? '#e6f0ff' // color suave al pasar el ratón sobre la opción
      : '#302e2e',
      cursor:"pointer"
    }),
  };
  

  return (
    <div className="menu-tipos">
      <Select
        value={selectedOption}
        onChange={handleOnChange}
        options={options}
        styles={customStyles}
        isSearchable={false}
      />
    </div>
  );
}

export default TypeMenu;
