import {  useEffect, useState } from 'react'

import './App.css'
import Entry from './Entities/Entry'
import EntryCard from './Components/EntryCard'

import ResponsiveMenu from './Components/ResponsiveMenu'


import { API_URL, CATEGORY_GRAMMAR, CATEGORY_VOCABULARY,  LANGUAGE_ENDPOINT, LOGO_IMG, NO_CONTENT_IMG } from './Constants'

import LogoContainer from './Components/LogoContainer'
import Language from './Entities/Language'
import Grammar from './Entities/Grammar'
import GrammarCard from './Components/GrammarCard'
import TypeMenu from './Components/TypeMenu'
import CategoryMenu from './Components/CategoryMenu'
import LanguageMenu from './Components/LanguageMenu'

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
  const [page, setPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0); 
  const size = 5; 
  const addUnitNumber = (numero: number) => {
    if (unitNumber.includes(numero)) return;
    const newUnits = [...unitNumber, numero];
    setUnitNumber(newUnits);
    
  };
  const removeUnit = (numero: number) => {
    const newUnits = unitNumber.filter(n => n !== numero);
    setUnitNumber(newUnits); 
   
  };
  
  

 

  useEffect(()=> //Upload the data filtered
  {
    setPage(0)
  },[type,unitNumber,category])

  useEffect(() => //Return units from the API
  {
    
    
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
        
      })
      .catch(error => console.error('Error al cargar los datos:', error));
      
  }, []);
  useEffect(()=>{setLanguage(languages[0])},[languages])
  useEffect(()=>{setUnitNumber([])},[language])
  useEffect(()=>{ setTotalUnits(language?.units!)},[language])
  const maxPage=totalElements<=size?0:Math.ceil(totalElements / size)-1
  const handleNextPage = () => {setPage(prev => Math.min(prev + 1, maxPage)); console.log("Page:" +page)};
  const handlePrevPage = () => {setPage(prev => Math.max(prev - 1, 0)); console.log("Page:" +page)};
  

  
    function callEntries() {
      const lessonNumbersParam = unitNumber.join(',');
      let endpoint = `${API_URL}/${category.toLowerCase()}/${language?.name.toLowerCase()}?lessonNumber=${lessonNumbersParam}&page=${page}&size=${size}`;
      
      if (type.toLowerCase() !== "todo") {
        endpoint += `&type=${type}`;
      }
      console.log("endpoint:", endpoint);
    
      fetch(endpoint)
        .then(response => response.json())
        .then(data => {
          
          setEntries(data.content); 
      
           setTotalElements(data.totalElements);
      
          console.log("data", data);
        })
        .catch(error => console.error('Error al cargar los datos:', error));
    }
    useEffect(()=>{console.log("SIZE"+size)},[size])
    function callGrammars() {
      const lessonNumbersParam = unitNumber.join(',');
      
      let endpoint = `${API_URL}/${category.toLowerCase()}/${language?.name.toLowerCase()}?lessonNumber=${lessonNumbersParam}&page=${page}&size=${size}`;
      
      console.log("endpoint:", endpoint);
    
      fetch(endpoint)
        .then(response => response.json())
        .then(data => {
          
          setGrammars(data.content); 
        
           setTotalElements(data.totalElements);
    
          console.log("data", data);
        })
        .catch(error => console.error('Error al cargar los datos:', error));
    }

    return (
      <>
        <header>
        {language&&<LanguageMenu languages={languages} setLanguage={setLanguage} value={language}/>} 
          <LogoContainer />
          <div className="container-menu-tipos">
            <CategoryMenu
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
         appendix={language?.appendixes ?? []}
            removeUnit={removeUnit}
            setClaseFondo={setClaseFondo}
            totalUnits={totalUnits}
            addUnitNumber={addUnitNumber}
            language={language}
            languages={languages}
            setLanguage={setLanguage}
           
          />
          <div className={`card  main ${claseFondo}`}>
            {unitNumber.length > 0 ? (
              <>
                <div className="menu-types">
                  {category === CATEGORY_VOCABULARY && (
                    <TypeMenu types={language?.types ?? []} setType={setType} value={type} />
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
                          src={NO_CONTENT_IMG}
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
                <h4 className='aviso-menu'>Abra el menu en la flor de la izquierda.</h4>
                <h4>
                  Para continuar selecione las unidades que desee consultar.
                  <br /> Con las pestañas podrás cambiar el tipo de consulta. <br /> Actual:
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
