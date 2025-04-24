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
import { ENTRIES_ENDPOINT, LANGUAGE_ENDPOINT, LOGO_IMG } from './Constants'
import { Unit } from './Entities/Unit'
import LogoContainer from './Components/LogoContainer'
import Language from './Entities/Language'

function App() {
  
  const [claseFondo,setClaseFondo]=useState("todo")
  const [entries, setEntries] = useState<Entry[]>([]);
  const[unitNumber,setUnitNumber]=useState(0)
  const[languages,setLanguages]=useState<Language[]>([])
  const[language,setLanguage]=useState<Language>()
  const [totalUnits, setTotalUnits]=useState(0)
  const[type,setType]=useState("Todo")
  const [units, setUnits] = useState<Unit[]>([]);
  const addUnit = (numero: number, entries:Entry[]) => 
    {
    if(entries.length===0)return
    const tempUnit={numero:numero,entries:entries}
    const tempUnits=units
    tempUnits.push(tempUnit)
    setUnits(tempUnits);

  };
  const removeUnit = (numero: number) => 
  {
    console.log("borrando")
    setUnits(prevUnits => prevUnits.filter(t => t.numero !== numero));
  };
  
  function filtrarPorTipo() 
  {
    const tempEntries: Entry[] = [];
    console.log("Filtrando")
    if(type==="Todo")
    {
      for (const unit of units) 
      {
        tempEntries.push(...unit.entries);
      }
      setEntries(tempEntries)
    }
    else{
      for (const unit of units) 
      {
        tempEntries.push(...unit.entries.filter(entry => entry.type === type));
      }
      setEntries(tempEntries)
    }
  }
 
  
  useEffect(()=> //Upload the data filtered
  {
    filtrarPorTipo()
  },[type,units])

  useEffect(() => //Return entries from the API
  {
    if(unitNumber===0){return}
    console.log("Iniciando api",type)
    
    console.log("endpoint",ENTRIES_ENDPOINT)
    fetch(ENTRIES_ENDPOINT+`/${unitNumber}/entries`) 
      .then(response => response.json())
      .then(data => {
        
        addUnit(unitNumber,Array.isArray(data) ? data : []); 
        filtrarPorTipo()
      })
      .catch(error => console.error('Error al cargar los datos:', error));
      
  }, [unitNumber,language]);

  useEffect(() => //Return total languages from the API
  {
    let s:Language[]=[]
    fetch(LANGUAGE_ENDPOINT) 
      .then(response => response.json())
      .then(data => {
        console.log(data)
        s=data
        setLanguages(s); 
        setLanguage(data[0])
        console.log(s)
      })
      .catch(error => console.error('Error al cargar los datos:', error));
      
  }, []);
  useEffect(()=>{

    console.log(language?.units)
    setTotalUnits(language?.units!)
  },[language])
  
  return (
    <>
    <header>
      <LogoContainer/>
      <div className='container-menu-tipos'><MenuTipos  type={type} setClaseFondo={setClaseFondo} setType={setType}/></div>

    </header>
      
      
      <div className='central-container'>
       <ResponsiveMenu  type={type} setType={setType} appendix={language?.appendixes} removeUnit={removeUnit}setClaseFondo={setClaseFondo} totalUnits={totalUnits} unitNumber={unitNumber} setUnitNumber={setUnitNumber}/>
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
