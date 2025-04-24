import { Component, useEffect, useState } from "react";
import { KanaGroup } from "../../Entities/KanaGroup";
import { APPEND_ENDPOINT, AppendixProps } from "../../Constants";

import React from "react";

interface Contador {
  contador: string;
  uso: string;
  numeros: string[];
  interrogacion: string;
}



const ListaContadores: React.FC<{ palabra: string }> = ({ palabra }) => {
    const [contadores,setContadores]=useState<Contador[]>([])
    useEffect(()=>{
        fetch(APPEND_ENDPOINT+palabra) 
        .then(response => response.json())
        .then(data => {
          let kl:Contador[]=[]
          kl=Array.isArray(data) ? data : []
          setContadores(kl)
          
        })
        .catch(error => console.error('Error al cargar los datos:', error));
      },[])  
  return (
    <div className="counter-component">
      {contadores.map((contador, index) => (
        <div key={index} className="counter-component-table" >
          <h3>{contador.contador}</h3>
          <p>Uso: {contador.uso}</p>
          <p>Interrogación: {contador.interrogacion}</p>
          <h4>Números:</h4>
          <ol>
            {contador.numeros.map((numero, index) => (
              <li key={index}>{numero}</li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
};

export default ListaContadores;
