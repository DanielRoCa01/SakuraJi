
import Select from 'react-select';
import Language from "../Entities/Language";

interface LanguageMenuProps {
  languages: Language[];
  setLanguage: (value: Language) => void;
  value: Language;
}

function LanguageMenu({ languages, value, setLanguage }: Readonly<LanguageMenuProps>) {
    
    
  const options =languages.map(language => ({
    value: language,
    label: language.name.charAt(0).toUpperCase() + language.name.slice(1)
  }));

  // Busca la opción seleccionada en el array de opciones
  const selectedOption = options.find(option => option.value === value);

  // Maneja el cambio de selección
  const handleOnChange = (option: { value: Language; label: string } | null) => {
    if (option) setLanguage(option.value);
  };
  const customStyles = {
    control: (provided: any, state: { isFocused: any; }) => ({
      ...provided,
      width: 180, // ancho fijo en píxeles
      minWidth: 180,
      maxWidth:180,
      color:  '#f9bec8',
      backgroundColor: '#302e2e',  // Cambia aquí el color de fondo que quieras
      borderColor: state.isFocused ? '#f9bec8' : '#f9bec8', // Opcional: color del borde
      boxShadow: state.isFocused ? '0 0 0 1pxrgb(255, 38, 248)' : null,
      '&:hover': {
        borderColor: '#f9bec8',
        backgroundColor: '#f9bec8',
        color: '#302e2e',
      },
    }),
    option: (provided: any, state: { isSelected: any; isFocused: any; }) => ({
      ...provided,
      color: state.isSelected ? '#302e2e' : '#f9bec8',
      backgroundColor: state.isSelected
      ? '#f9bec8'
      : state.isFocused
      ? '#e6f0ff' // color suave al pasar el ratón sobre la opción
      : '#302e2e',
      cursor:"pointer",
      '&:hover': {
        color: '#302e2e',
      },
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: '#f9bec8', // <-- AQUÍ cambias el color base del texto seleccionado
      '&:hover': {
        color: '#302e2e',
      },
    }),
  };
  

  return (
    <div className="menu-lenguajes">
      <Select
        value={selectedOption}
        onChange={handleOnChange}
        options={options}
        styles={customStyles}
        isSearchable={false}
        className="react-select-container"
        classNamePrefix="react-select"
      />
    </div>
  );
}

export default LanguageMenu;
