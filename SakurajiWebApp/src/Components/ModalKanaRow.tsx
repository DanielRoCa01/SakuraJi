import React, { useRef, useEffect, useState, ComponentType } from "react";
import { appendixComponentsList } from "../Constants";
import { Count } from "./appendix/Count";

interface ModalKanaRowProps {
  appendix: string[];
  onClose: () => void;
}

// Si tus componentes necesitan props, define el tipo aquí
type AppendixComponentProps = {}; // Cambia esto si necesitas pasar props

const ModalKanaRow: React.FC<ModalKanaRowProps> = ({ onClose, appendix }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Estado para la clave del componente a mostrar
  const [selectedAppendix, setSelectedAppendix] = useState<string>(
     "" // Usa el segundo, si no el primero, si no vacío
  );

  // Obtén el componente correspondiente
  const AppendixComponent: ComponentType<any> | undefined =
    appendixComponentsList[selectedAppendix];

  // Cierra el modal si se hace clic fuera del contenido
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="modal">
      <div className="kana-container" ref={modalRef}>
        
        {appendix.map((palabra, idx) => (
    <button className='kana-button' key={idx} onClick={()=>{setSelectedAppendix(palabra)}} style={{ marginRight: 8 }}>
      {palabra.toUpperCase()}
    </button>
  ))}
        
        {AppendixComponent ? (
          <AppendixComponent palabra={selectedAppendix}/>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default ModalKanaRow;

