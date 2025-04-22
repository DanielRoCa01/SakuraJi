import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Entry from './Entities/Entry'
import EntryCard from './Components/EntryCard'
import UnitButton from './Components/UnitButton'
import TypeButton from './Components/TypeButton'

function App() {
 
  const [claseFondo,setClaseFondo]=useState("todo")
  const [entries, setEntries] = useState<Entry[]>([]);
  const[unitNumber,setUnitNumber]=useState(0)
  const[totalUnits,setTotalUnits]=useState(0)
  const[type,setType]=useState("Todo")
  const ENTRIES_ENDPOINT=`http://localhost:8080/api/japones/${unitNumber}/entries`
  const UNIT_COUNT_ENDPOINT=`http://localhost:8080/api/japones/count`
  useEffect(() => {
    console.log("type",type)
    const endpoint=type!=="Todo"?ENTRIES_ENDPOINT+`?type=${type}`:ENTRIES_ENDPOINT
    console.log("endpoint",endpoint)
    fetch(endpoint) 
      .then(response => response.json())
      .then(data => {
        setEntries(Array.isArray(data) ? data : []); 
      })
      .catch(error => console.error('Error al cargar los datos:', error));
  }, [unitNumber,type]);
  useEffect(() => {
    fetch(UNIT_COUNT_ENDPOINT) 
      .then(response => response.json())
      .then(data => {
        setTotalUnits(data); 
      })
      .catch(error => console.error('Error al cargar los datos:', error));
  }, [unitNumber]);
  const unitsButtons = [];
  for (let i = 1; i <= totalUnits; i++) {
    unitsButtons.push(<UnitButton key={i} isSelected={unitNumber===i} number={i} setUnitNumber={setUnitNumber } />);
  }

  



  return (
    <>
    <header>
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
      <div className='menu-tipos'>
      <TypeButton setClaseFondo={setClaseFondo} isSelected={type==='Todo'} setType={setType} filter='Todo' />
      <TypeButton setClaseFondo={setClaseFondo} isSelected={type==='Kanji'}setType={setType} filter='Kanji' />
      <TypeButton setClaseFondo={setClaseFondo} isSelected={type==='Vocabulario'}setType={setType} filter='Vocabulario' />
      <TypeButton setClaseFondo={setClaseFondo} isSelected={type==='Verbos'}setType={setType} filter='Verbos' />
      <TypeButton setClaseFondo={setClaseFondo} isSelected={type==='Adjetivos'}setType={setType} filter='Adjetivos' />
      
       
      </div>
    </header>
      
      
      <div className='central-container'>
        <div className='columna-menus'>
          <div className='menu-unidades'> 
            <h3>Unidades</h3>
            {unitsButtons}
            
            </div>
          <div className='menu-modos'>
          <button>
               Estudio
            </button>
            <button>
               Practica
            </button>
          </div>
        </div>
        <div className={`card  main ${claseFondo}`}>
        {entries.map((entry, index) => (
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
