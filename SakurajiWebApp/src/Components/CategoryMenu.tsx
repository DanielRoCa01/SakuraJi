
import { CATEGORY_GRAMMAR, CATEGORY_VOCABULARY } from "../Constants";
import CategoryButton from "./CategoryButton";


interface CategoryMenuProps {
    
    setClaseFondo: (value: string) => void;
    //setType: (value: string) => void;
    //type: string;
    setCategory:(value:string)=>void;
    category: string
    
    
}
// El menú de tipos
function CategoryMenu({ setClaseFondo,  setCategory, category }:Readonly<CategoryMenuProps>) {
  

  return (
    <div className="menu-category">
      <CategoryButton
          
          setClaseFondo={setClaseFondo}
          isSelected={category === CATEGORY_GRAMMAR}
          setCategory={setCategory}
          filter={CATEGORY_GRAMMAR}
        />
        <CategoryButton
          setClaseFondo={setClaseFondo}
          isSelected={category === CATEGORY_VOCABULARY}
          setCategory={setCategory}
          filter={CATEGORY_VOCABULARY}
        />
    
    </div>
  );
}

export default CategoryMenu;