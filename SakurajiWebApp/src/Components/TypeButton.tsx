

interface TypeButtonProps {
    setClaseFondo: (value: string) => void;
    setType: (value: string) => void;
    filter: string;
    isSelected:boolean
    
}

function TypeButton({ setClaseFondo, setType, filter,isSelected}: Readonly<TypeButtonProps>) {
  
    const className = `${filter.toLowerCase()} ${isSelected ? 'is-selected' : ''}`;
  return (
    <button
      onClick={() => {
        setClaseFondo(filter.toLowerCase());
        setType(filter);console.log("Click")
      }}
      className={`${className} tipos`}
    >
      {filter}
    </button>
  );
}

export default TypeButton;