import { lazy, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Entry from './Entities/Entry'
import EntryCard from './Components/EntryCard'
import UnitButton from './Components/UnitButton'
import TypeButton from './Components/TypeButton'
import ResponsiveMenu from './Components/ResponsiveMenu'
import MenuTipos from './Components/CategoryMenu'
import { Kana } from './Entities/Kana'
import { CATEGORY_GRAMMAR, CATEGORY_VOCABULARY, ENDPOINT, ENTRIES_ENDPOINT, LANGUAGE_ENDPOINT, LOGO_IMG } from './Constants'
import { Unit } from './Entities/Unit'
import LogoContainer from './Components/LogoContainer'
import Language from './Entities/Language'
import Grammar from './Entities/Grammar'
import GrammarCard from './Components/GrammarCard'
import TypeMenu from './Components/TypeMenu'

function App() {
  
  const [claseFondo,setClaseFondo]=useState("vocabulary")
  const [entries, setEntries] = useState<Entry[]>([]);
  const [grammars, setGrammars] = useState<Grammar[]>([]);
  const[unitNumber,setUnitNumber]=useState(0)
  const[category,setCategory]=useState(CATEGORY_VOCABULARY)
  const[languages,setLanguages]=useState<Language[]>([])
  const[language,setLanguage]=useState<Language>()
  const [totalUnits, setTotalUnits]=useState(0)
  const[type,setType]=useState("Todo")
  const [units, setUnits] = useState<Unit[]>([]);
  const addUnit = (numero: number, unit:Unit) => 
    {
    if(!unit)return
    const tempUnit=unit
    const tempUnits=units
    tempUnits.push(tempUnit)
    setUnits(tempUnits);

  };
  const removeUnit = (numero: number) => 
  {
    console.log("borrando",numero)
    let prevUnits = units
    let tempUnits = prevUnits.filter(t => t.number !== numero)
    console.log("removed",tempUnits)
    setUnits(tempUnits);
  };
  const addGrammars=()=>{
    console.log("units",units)
    const tempGrammars:Grammar[]=[]
    for (const unit of units) 
      {
        console.log("unit",unit)
        if(unit.grammars){
          tempGrammars.push(...unit.grammars);
        }
        
      }
      
      setGrammars(tempGrammars)
      console.log("grammars",grammars)
  }
  function filtrarPorTipo() 
  {
    const tempEntries: Entry[] = [];
    console.log("Filtrando",units)
    if(type==="Todo")
    {
      for (const unit of units) 
      {
        if(unit.entries){
          tempEntries.push(...unit.entries);
        }
        
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
    addGrammars()
  },[units])
  useEffect(()=> //Upload the data filtered
  {
    filtrarPorTipo()
  },[type,units])

  useEffect(() => //Return units from the API
  {
    if(unitNumber===0){return}
    console.log("Iniciando api",type)
    const endpoint=`${ENDPOINT}/${category.toLowerCase()}/japanese/${unitNumber}`
    console.log("endpoint",endpoint)
    fetch(endpoint) 
      .then(response => response.json())
      .then(data => {
        const unit=data;
        console.log("data",data)
        addUnit(unitNumber,unit); 
        filtrarPorTipo()
        addGrammars()
      })
      .catch(error => console.error('Error al cargar los datos:', error));
      
  }, [unitNumber,language,category]);

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
      <div className='container-menu-tipos'><MenuTipos  category={category} setClaseFondo={setClaseFondo} setCategory={setCategory}/></div>

    </header>
      
      
      <div className='central-container'>
       <ResponsiveMenu  type={type} setType={setType} appendix={language?.appendixes} removeUnit={removeUnit}setClaseFondo={setClaseFondo} totalUnits={totalUnits} unitNumber={unitNumber} setUnitNumber={setUnitNumber}/>
        <div className={`card  main ${claseFondo}`}>
          <div className='menu-types'>{unitNumber>0&&category===CATEGORY_VOCABULARY&&<TypeMenu types={language?.types} setType={setType} value={type} />}</div>
          <div className='main-content'>
            {category === CATEGORY_VOCABULARY && entries.map((entry, index) => (
              <EntryCard key={index} entry={entry} claseFondo={claseFondo} />
            ))}
            {category === CATEGORY_GRAMMAR && grammars.map((grammar, index) => (
              <GrammarCard key={index} grammar={grammar}  />
            ))}

          {entries.length===0&&category===CATEGORY_VOCABULARY&&unitNumber!==0&&
            <div className='empty-content'>
              <img src="https://s3.voyapon.com/wp-content/uploads/sites/3/2020/06/27170907/pose_syazai_man.png" alt="Sumimasen" />
              <h1>Lo sentimos esta sección no tiene contenido...</h1>
              <h2>Prueba seleccionando otra unidad u otra pestaña de tipo.</h2>
            </div>
          }
          {unitNumber===0&&
            <div className='home-content'>
            <img src={LOGO_IMG} alt="Sumimasen" />
            <h1>{language?.greeting}</h1>
            <h2>!!Bienvenido a Sakuraji: {language?.name.toUpperCase()}!!</h2>
            <h4>Para continuar selecione las unidades que dese consultar.<br/> Con las pestañas podras cambiar el tipo de consulta. <br/> Actual:{category}</h4>
          </div>
          }
          </div>
          
            
              
        
        </div>
      </div>
     
     
    </>
  )
}

export default App
