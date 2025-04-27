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
  const[unitNumber,setUnitNumber]=useState<number[]>([])
  const[category,setCategory]=useState(CATEGORY_VOCABULARY)
  const[languages,setLanguages]=useState<Language[]>([])
  const[language,setLanguage]=useState<Language>()
  const [totalUnits, setTotalUnits]=useState(0)
  const[type,setType]=useState("Todo")
  const [units, setUnits] = useState<Unit[]>([]);
  const [page, setPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0); // Página actual (empieza en 0)
const [size, setSize] = useState(5); 
  const addUnitNumber = (numero: number) => {
    if (unitNumber.includes(numero)) return;
    // Crea un nuevo array con el número añadido
    const newUnits = [...unitNumber, numero];
    setUnitNumber(newUnits);
    console.log("unitNumber:", newUnits);
  };
  const removeUnit = (numero: number) => {
    // Crea un nuevo array excluyendo el número
    const newUnits = unitNumber.filter(n => n !== numero);
    setUnitNumber(newUnits); // Esto sí dispara el useEffect correctamente
    console.log("unitNumber:", newUnits);
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
    setPage(0)
  },[type,unitNumber,category])

  useEffect(() => //Return units from the API
  {
    
    console.log("Iniciando api",type)
    if(category==="Vocabulary"){
      callEntries()
      return
    }
    callGrammars()
    
      
  }, [page,unitNumber,language,category,type]);

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
  const maxPage=totalElements<=size?0:Math.ceil(totalElements / size)-1
  const handleNextPage = () => {setPage(prev => Math.min(prev + 1, maxPage)); console.log("Page:" +page)};
  const handlePrevPage = () => {setPage(prev => Math.max(prev - 1, 0)); console.log("Page:" +page)};
  
  // Para cambiar el tamaño de página
  const handleSizeChange = (newSize) => setSize(newSize);
  
  // Llama a callEntries cada vez que cambian page, size o unitNumber
  
  
    function callEntries() {
      const lessonNumbersParam = unitNumber.join(',');
      let endpoint = `${ENDPOINT}/${category.toLowerCase()}/japanese?lessonNumber=${lessonNumbersParam}&page=${page}&size=${size}`;
      
      if (type.toLowerCase() !== "todo") {
        endpoint += `&type=${type}`;
      }
      console.log("endpoint:", endpoint);
    
      fetch(endpoint)
        .then(response => response.json())
        .then(data => {
          // data es un objeto PageResponse
          // data.content -> array de resultados
          // data.page, data.size, data.totalElements -> info de paginación
          setEntries(data.content); // Solo el array de resultados
          // Puedes guardar también la info de paginación si la necesitas
           setTotalElements(data.totalElements);
           //setPage(data.page);
           //setSize(data.size);
          console.log("data", data);
        })
        .catch(error => console.error('Error al cargar los datos:', error));
    }
    useEffect(()=>{console.log("SIZE"+size)},[size])
    function callGrammars() {
      const lessonNumbersParam = unitNumber.join(',');
      // Añade los parámetros de paginación
      let endpoint = `${ENDPOINT}/${category.toLowerCase()}/japanese?lessonNumber=${lessonNumbersParam}&page=${page}&size=${size}`;
      
      console.log("endpoint:", endpoint);
    
      fetch(endpoint)
        .then(response => response.json())
        .then(data => {
          // data es un objeto PageResponse<Grammar>
          // data.content -> array de resultados
          setGrammars(data.content); // Actualiza solo el array de resultados
          // Si necesitas la info de paginación:
           setTotalElements(data.totalElements);
           //setPage(data.page);
          // setSize(data.size);
          console.log("data", data);
        })
        .catch(error => console.error('Error al cargar los datos:', error));
    }

    return (
      <>
        <header>
          <LogoContainer />
          <div className="container-menu-tipos">
            <MenuTipos
              category={category}
              setClaseFondo={setClaseFondo}
              setCategory={setCategory}
            />
          </div>
        </header>
  
        <div className="central-container">
          <ResponsiveMenu
            category={category}
            setCategory={setCategory}
            appendix={language?.appendixes}
            removeUnit={removeUnit}
            setClaseFondo={setClaseFondo}
            totalUnits={totalUnits}
            addUnitNumber={addUnitNumber}
          />
          <div className={`card  main ${claseFondo}`}>
            {unitNumber.length > 0 ? (
              <>
                <div className="menu-types">
                  {category === CATEGORY_VOCABULARY && (
                    <TypeMenu types={language?.types} setType={setType} value={type} />
                  )}
                </div>
                <div className="page-menu">
                  <button onClick={handlePrevPage} disabled={page === 0}>
                    {'←'}
                  </button>
                  <div className="total-elements">
                    {page + 1}/{maxPage + 1}
                  </div>
                  <button onClick={handleNextPage} disabled={page >= maxPage}>
                    {'→'}
                  </button>
                </div>
                <div className="main-content">
                  {category === CATEGORY_VOCABULARY &&
                    entries.map((entry, index) => (
                      <EntryCard key={index} entry={entry} claseFondo={claseFondo} />
                    ))}
                  {category === CATEGORY_GRAMMAR &&
                    grammars.map((grammar, index) => (
                      <GrammarCard key={index} grammar={grammar} />
                    ))}
                  {entries.length === 0 &&
                    category === CATEGORY_VOCABULARY &&
                    unitNumber.length !== 0 && (
                      <div className="empty-content">
                        <img
                          src="https://s3.voyapon.com/wp-content/uploads/sites/3/2020/06/27170907/pose_syazai_man.png"
                          alt="Sumimasen"
                        />
                        <h1>Lo sentimos esta sección no tiene contenido...</h1>
                        <h2>Prueba seleccionando otra unidad u otra pestaña de tipo.</h2>
                      </div>
                    )}
                </div>
              </>
            ) : (
              <div className="home-content">
                <img src={LOGO_IMG} alt="Sumimasen" />
                <h1>{language?.greeting}</h1>
                <h2>!!Bienvenido a Sakuraji: {language?.name.toUpperCase()}!!</h2>
                <h4>
                  Para continuar selecione las unidades que dese consultar.
                  <br /> Con las pestañas podras cambiar el tipo de consulta. <br /> Actual:
                  {category}
                </h4>
              </div>
            )}
          </div>
        </div>
      </>
    );
  // Para cambiar de página

  
}

export default App
