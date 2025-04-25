import React from "react";
import TypeButton from "./TypeButton";
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
function CategoryMenu({ setClaseFondo,  setCategory, category }:CategoryMenuProps) {
  const tipos = ["Todo", "Kanji", "Vocabulario", "Verbos", "Adjetivos"];

  return (
    <div className="menu-tipos">
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