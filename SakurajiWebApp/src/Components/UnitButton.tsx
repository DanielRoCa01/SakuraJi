import { useState } from "react";

interface UnitButtonProps {
  removeUnit:(value: number) => void;
  addUnitNumber: (value: number) => void;
  number: number;
  
  
}
function UnitButton({ removeUnit, number, addUnitNumber }: Readonly<UnitButtonProps>) {
    const [selected,setSelected]=useState(false)
    const handdleClick=(number:number)=>{
        console.log("boton clickado")
        if(selected){removeUnit(number)
            
        }
        else{addUnitNumber(number)}
        setSelected(!selected)
        
    }
      return (
    <button
      className={selected ? 'is-selected' : ''}
      onClick={() =>handdleClick(number) }
    >
      {number}
    </button>
  );
}

  
  export default UnitButton;