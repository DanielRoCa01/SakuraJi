// src/components/ModalKanaRow.tsx
import React, { useRef, useEffect, useState } from "react";
import { Kana } from "../Entities/Kana";
import { KanaGroup } from "../Entities/KanaGroup";

interface ModalKanaRowProps {
  
  onClose: () => void;
}

const ModalKanaRow: React.FC<ModalKanaRowProps> = ({  onClose }) => {
    const [kanaList,setKanaList]=useState<KanaGroup[]>([])
  const modalRef = useRef<HTMLDivElement>(null);
  const KANA_ENDPOINT=`http://localhost:8080/api/japones/kana`
  useEffect(()=>{
    fetch(KANA_ENDPOINT) 
    .then(response => response.json())
    .then(data => {
      let kl:KanaGroup[]=[]
      kl=Array.isArray(data) ? data : []
      setKanaList(kl)
      console.log("Kanas",kanaList)
    })
    .catch(error => console.error('Error al cargar los datos:', error));
  },[])
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
    <div className="modal"
      
    >
      <div className="kana-container"
        ref={modalRef}
        
      >
        <div style={{ padding:"0",margin:"0"}}>
            <h4 style={{ color: "rgb(190, 217, 249)", padding:"0",margin:"0" }}>Hirakana</h4>
            <h4 style={{ color: "rgb(249, 190, 200) " , padding:"0",margin:"0"}}>Katakana</h4>
        </div>
        
        <div style={{display:"flex",textAlign: "center", fontSize: "2rem", minWidth: "2.5rem" }}>
        <h3 style={{ margin: "auto 0.54em" }}></h3>
        <h3 style={{ margin: "auto 0.54em" }}>A</h3>
        <h3 style={{ margin: "auto 0.54em" }}>I</h3>
        <h3 style={{ margin: "auto 0.54em" }}>U</h3>
        <h3 style={{ margin: "auto 0.54em" }}>E</h3>
        <h3 style={{ margin: "auto 0.54em" }}>O</h3>
        </div>
        {kanaList.map((group) => (
          <div key={group.title} style={{ marginBottom: "1rem" }}>
            
            <div style={{ display: "flex", gap: "1.5rem" }}>
            <div style={{ marginTop: "1rem" }}>{group.title}</div>
              {group.kana.map((kana) => (
                <div
                  key={kana.silaba}
                  style={{ textAlign: "center", fontSize: "2rem", minWidth: "2.5rem" }}
                >
                  <div style={{ color: "rgb(190, 217, 249)" }}>{kana.hiragana}</div>
                  <div style={{ color: "rgb(249, 190, 200)" }}>{kana.katakana}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModalKanaRow;
