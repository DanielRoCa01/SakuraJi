import { useEffect, useState } from "react";
import { KanaGroup } from "../../Entities/KanaGroup";
import { APPEND_ENDPOINT} from "../../Constants";


  
  const KanaComponent: React.FC<{ palabra: string }> = ({ palabra })=> {
 const [kanaList,setKanaList]=useState<KanaGroup[]>([])
  
  useEffect(()=>{
    fetch(APPEND_ENDPOINT+palabra) 
    .then(response => response.json())
    .then(data => {
      let kl:KanaGroup[]=[]
      kl=Array.isArray(data) ? data : []
      setKanaList(kl)
      console.log("Kanas",kanaList)
    })
    .catch(error => console.error('Error al cargar los datos:', error));
  },[])    
    return (
      <><div style={{ padding:"0",margin:"0"}}>
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
      ))}</>
    );
  }
  
  export default KanaComponent;

