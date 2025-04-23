import { lazy, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Entry from './Entities/Entry'
import EntryCard from './Components/EntryCard'
import UnitButton from './Components/UnitButton'
import TypeButton from './Components/TypeButton'
import ResponsiveMenu from './Components/ResponsiveMenu'
import MenuTipos from './Components/MenuTipos'
import { Kana } from './Entities/Kana'

function App() {
 // const EntryCard = lazy(() => import("./Components/EntryCard"));
  type Unit = {
    numero: number;
    entries: Entry[];
  };
  
  const [units, setUnits] = useState<Unit[]>([]);
  const addUnit = (numero: number, entries:Entry[]) => {
    if(entries.length===0)return
    
    const tempUnit={numero:numero,entries:entries}
    const tempUnits=units
    tempUnits.push(tempUnit)
    setUnits(tempUnits);
    
    
  };
  const removeUnit = (numero: number) => {
    console.log("borrando")
    setUnits(prevUnits => prevUnits.filter(t => t.numero !== numero));
    
  };
  const [claseFondo,setClaseFondo]=useState("todo")
  const [entries, setEntries] = useState<Entry[]>([]);
  const[unitNumber,setUnitNumber]=useState(0)
  const[totalUnits,setTotalUnits]=useState(0)
  const[type,setType]=useState("Todo")
  function filtrarPorTipo() {
    const tempEntries: Entry[] = [];
    console.log("Filtrando")
    if(type==="Todo"){
      
      for (const unit of units) {
        
        tempEntries.push(...unit.entries);
        
      }
      setEntries(tempEntries)
    }
    else{
      for (const unit of units) {
        tempEntries.push(...unit.entries.filter(entry => entry.type === type));
        
      }
      setEntries(tempEntries)
    }
    
  }
  const UNIT_COUNT_ENDPOINT=`http://localhost:8080/api/japones/count`
 let kanaList:Kana[]=[]
  const ENTRIES_ENDPOINT=`http://localhost:8080/api/japones/${unitNumber}/entries`
  
  useEffect(()=>{
    filtrarPorTipo()
  },[type,units])
  useEffect(() => {
    if(unitNumber===0){return}
    console.log("Iniciando api",type)
    
    console.log("endpoint",ENTRIES_ENDPOINT)
    fetch(ENTRIES_ENDPOINT) 
      .then(response => response.json())
      .then(data => {
        
        addUnit(unitNumber,Array.isArray(data) ? data : []); 
        filtrarPorTipo()
      })
      .catch(error => console.error('Error al cargar los datos:', error));
      
  }, [unitNumber]);
  useEffect(() => {
    fetch(UNIT_COUNT_ENDPOINT) 
      .then(response => response.json())
      .then(data => {
        setTotalUnits(data); 
      })
      .catch(error => console.error('Error al cargar los datos:', error));
      
  }, [unitNumber]);
  
  return (
    <>
    <header>
    <div className='logo-container'>
        <div>
        <a className='logo' href="./assets/logo.png" target="_blank">
          <img src="https://sdmntprwestus.oaiusercontent.com/files/00000000-a82c-5230-a97e-dc8453c33848/raw?se=2025-04-22T08%3A54%3A25Z&sp=r&sv=2024-08-04&sr=b&scid=0f906d01-2370-5e99-950c-b2c5de4d1535&skoid=06d77cea-897f-49c6-9d78-20f6510f72af&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-04-22T06%3A07%3A11Z&ske=2025-04-23T06%3A07%3A11Z&sks=b&skv=2024-08-04&sig=f6vpTeOWkyElquhswp5hnwhnziW2cPAzXBYU8KZqh3c%3D" 
          className=" sakura"
           alt="Vite logo" />
        
        <div className='title '><h1>Sakuraji Web App</h1></div>
        </a>
        </div>
      </div>
      <div className='container-menu-tipos'><MenuTipos  type={type} setClaseFondo={setClaseFondo} setType={setType}/></div>

    </header>
      

      <div className='central-container'>
       <ResponsiveMenu  type={type} setType={setType} removeUnit={removeUnit}setClaseFondo={setClaseFondo} totalUnits={totalUnits} unitNumber={unitNumber} setUnitNumber={setUnitNumber}/>
        <div className={`card  main ${claseFondo}`}>
        {entries.map((entry, index) =>  (
          <EntryCard key={index} entry={entry} claseFondo={claseFondo} />
        
      ))}
      {entries.length===0&&
        <div className='empty-content'>
          <img src="https://s3.voyapon.com/wp-content/uploads/sites/3/2020/06/27170907/pose_syazai_man.png" alt="Sumimasen" />
          <h1>Lo sentimos esta sección no tiene contenido...</h1>
          <h2>Prueba seleccionando otra unidad u otra pestaña de tipo.</h2>
        </div>
      }
         
          
        
        </div>
      </div>
     
     
    </>
  )
}

export default App
