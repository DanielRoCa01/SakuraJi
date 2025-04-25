import React, { useState } from 'react';
import MenuTipos from './CategoryMenu';
import ModalKanaRow from './ModalKanaRow';
import { Kana } from '../Entities/Kana';
import { LOGO_IMG } from '../Constants';
import LogoContainer from './LogoContainer';
import UnitButton from './UnitButton';

interface ResponsiveMenuProps {
    removeUnit:(value: number) => void;
    setUnitNumber: (value: number) => void;
    unitNumber: number;
    totalUnits:number;
    setClaseFondo: (value: string) => void;
    setType: (value: string) => void;
    type: string;
    appendix:string[];
    
}
// Suponiendo que tienes este componente

function ResponsiveMenu({ removeUnit,totalUnits, appendix, setUnitNumber,setClaseFondo, type, setType }:Readonly<ResponsiveMenuProps>) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Genera los botones de unidades
  const unitsButtons = [];
  for (let i = 1; i <= totalUnits; i++) {
    unitsButtons.push(
      <UnitButton
        key={i}
        number={i}
        setUnitNumber={setUnitNumber}
        removeUnit={removeUnit}
      />
    );
  }
  const [showModal, setShowModal] = useState(false);
  return (
    <div className={`columna-menus${menuOpen ? ' menu-open' : ''}`}>
     <div className='menu-button-container'>
       <button
          className="menu-toggle"
          aria-label="Abrir menú"
          onClick={() => setMenuOpen(!menuOpen)}
        >
        <img src={LOGO_IMG} 
              className=" sakura"
              alt="Vite logo" />
        </button>
      </div>
      <div className='menu-tipos-responsive menu'>
        <LogoContainer/>
        <MenuTipos  type={type} setClaseFondo={setClaseFondo} setType={setType}/>
        </div>
        {appendix && appendix.length > 0 && (
          <button className='kana-button' onClick={() => setShowModal(true)}>
            Apendice
          </button>
        )}
      {showModal && (
        <ModalKanaRow  appendix={appendix} onClose={() => setShowModal(false)} />
      )}
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
