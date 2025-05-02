import { useEffect, useState } from "react";
import Language from "../Entities/Language";

interface UnitButtonProps {
  removeUnit:(value: number) => void;
  addUnitNumber: (value: number) => void;
  number: number;
  language:Language|undefined;
  
}

function UnitButton({ removeUnit, number, addUnitNumber,language }: Readonly<UnitButtonProps>) {

    const [selected,setSelected]=useState(false)
    useEffect(()=>{setSelected(false)},[language])
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