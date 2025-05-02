import  { useState, useEffect, useRef } from 'react';

import ModalKanaRow from './ModalKanaRow';

import { LOGO_IMG } from '../Constants';
import LogoContainer from './LogoContainer';
import UnitButton from './UnitButton';
import CategoryMenu from './CategoryMenu';
import LanguageMenu from './LanguageMenu';
import Language from '../Entities/Language';

interface ResponsiveMenuProps {
    removeUnit:(value: number) => void;
    addUnitNumber: (value: number) => void;
    
    totalUnits:number;
    setClaseFondo: (value: string) => void;
    setCategory: (value: string) => void;
    category: string;
    appendix:string[];
    setLanguage:(value:Language)=>void;
    language:Language| undefined;
    languages:Language[]
}     
// Suponiendo que tienes este componente

function ResponsiveMenu({ removeUnit,totalUnits, appendix, addUnitNumber,setClaseFondo, category, setCategory, setLanguage,language, languages }:Readonly<ResponsiveMenuProps>) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  // Genera los botones de unidades
  const unitsButtons = [];
  for (let i = 1; i <= totalUnits; i++) {
    unitsButtons.push(
      <UnitButton
        key={i}
        number={i}
        addUnitNumber={addUnitNumber}
        removeUnit={removeUnit}
        language={language}
      />
    );
  }

  useEffect(() => {
    if (!menuOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);


  const [showModal, setShowModal] = useState(false);
  return (
    <div ref={menuRef}  className={`columna-menus${menuOpen ? ' menu-open' : ''}`}>
      <div className='menu-tipos-movil'>{language&&<LanguageMenu languages={languages} setLanguage={setLanguage} value={language}/>} </div>
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
        <CategoryMenu  category={category} setClaseFondo={setClaseFondo} setCategory={setCategory}/>
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
       
      </div>
        </div>
      
    </div>
  );
}

export default ResponsiveMenu;
