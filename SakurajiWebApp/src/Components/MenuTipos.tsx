import React from "react";
import TypeButton from "./TypeButton";


interface MenuTiposProps {
    
    setClaseFondo: (value: string) => void;
    setType: (value: string) => void;
    type: string;
    
    
}
// El menú de tipos
function MenuTipos({ setClaseFondo, type, setType }:MenuTiposProps) {
  const tipos = ["Todo", "Kanji", "Vocabulario", "Verbos", "Adjetivos"];

  return (
    <div className="menu-tipos">
      {tipos.map((tipo) => (
        <TypeButton
          key={tipo}
          setClaseFondo={setClaseFondo}
          isSelected={type === tipo}
          setType={setType}
          filter={tipo}
        />
      ))}
    </div>
  );
}

export default MenuTipos;