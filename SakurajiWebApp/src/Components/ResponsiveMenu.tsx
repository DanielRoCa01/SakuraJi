import React, { useState } from 'react';
import MenuTipos from './MenuTipos';
interface UnitButtonProps {
    
    setUnitNumber: (value: number) => void;
    number: number;
    isSelected:boolean
    
}
interface ResponsiveMenuProps {
    
    setUnitNumber: (value: number) => void;
    unitNumber: number;
    totalUnits:number;
    setClaseFondo: (value: string) => void;
    setType: (value: string) => void;
    type: string;
    
}
// Suponiendo que tienes este componente
function UnitButton({ isSelected, number, setUnitNumber }: UnitButtonProps) {
  return (
    <button
      className={isSelected ? 'is-selected' : ''}
      onClick={() => setUnitNumber(number)}
    >
      {number}
    </button>
  );
}

function ResponsiveMenu({ totalUnits, unitNumber, setUnitNumber,setClaseFondo, type, setType }:ResponsiveMenuProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Genera los botones de unidades
  const unitsButtons = [];
  for (let i = 1; i <= totalUnits; i++) {
    unitsButtons.push(
      <UnitButton
        key={i}
        isSelected={unitNumber === i}
        number={i}
        setUnitNumber={setUnitNumber}
      />
    );
  }

  return (
    <div className={`columna-menus${menuOpen ? ' menu-open' : ''}`}>
      <button
        className="menu-toggle"
        aria-label="Abrir menú"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        &#9776;
      </button>
      <div className='menu-tipos-responsive menu'>
      <div className='logo-container'>
        <div>
        <a href="./assets/logo.png" target="_blank">
          <img src="https://sdmntprwestus.oaiusercontent.com/files/00000000-a82c-5230-a97e-dc8453c33848/raw?se=2025-04-22T08%3A54%3A25Z&sp=r&sv=2024-08-04&sr=b&scid=0f906d01-2370-5e99-950c-b2c5de4d1535&skoid=06d77cea-897f-49c6-9d78-20f6510f72af&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-04-22T06%3A07%3A11Z&ske=2025-04-23T06%3A07%3A11Z&sks=b&skv=2024-08-04&sig=f6vpTeOWkyElquhswp5hnwhnziW2cPAzXBYU8KZqh3c%3D" 
          className="logo sakura"
           alt="Vite logo" />
        </a>
        <div className='title'><h1>Sakuraji Web App</h1></div>
        </div>
      </div>
        <MenuTipos  type={type} setClaseFondo={setClaseFondo} setType={setType}/>
        </div>
        <div className='columna-secundaria'>
        <div className="menu-unidades">
        <h3>Unidades</h3>
        {unitsButtons}
      </div>
      <div className="menu-modos">
        <button>Estudio</button>
        <button>Practica</button>
      </div>
        </div>
      
    </div>
  );
}

export default ResponsiveMenu;
