import { LOGO_IMG } from "../Constants";

interface UnitButtonProps {
    
  }
  
  function LogoContainer({}: UnitButtonProps) {
    return (
        <div className='logo-container'>
        <div>
          <a className='logo' href="./assets/logo.png" target="_blank">
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