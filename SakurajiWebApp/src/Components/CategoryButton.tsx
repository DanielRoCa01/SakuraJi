

interface CategoryButtonProps {
  setClaseFondo: (value: string) => void;
  //setType: (value: string) => void;
  //type: string;
  setCategory:(value:string)=>void;
 
    filter: string;
    isSelected:boolean
    
}

function CategoryButton({ setClaseFondo, setCategory, filter,isSelected}: Readonly<CategoryButtonProps>) {
    const className = `${filter.toLowerCase()} ${isSelected ? 'is-selected' : ''}`;
  return (
    <button
      onClick={() => {
        setClaseFondo(filter.toLowerCase());
        setCategory(filter);console.log("Click")
      }}
      className={`${className} tipos`}
    >
      {filter}
    </button>
  );
}

export default CategoryButton;