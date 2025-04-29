import { LOGO_IMG } from "../Constants";



  function LogoContainer({}) {
    return (
        <div className='logo-container'>
        <div>
          <a className='logo' href="." >
            <img src={LOGO_IMG} 
            className=" sakura"
            alt="Vite logo" />
          
            <div className='title '><h1>Sakuraji Web App</h1></div>
          </a>
        </div>
        
      </div>
    );
  }
  
  export default LogoContainer;