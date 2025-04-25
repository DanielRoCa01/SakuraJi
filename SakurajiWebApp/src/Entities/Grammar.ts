interface Example {
  
    sentence: string;
    spelling: string| null;
    translation: string[];  // Can be a string array or null
  
  } 
  interface Grammar {
  
      structure: string;
      explanation: string[];
      example: Example[] | null; // Can be a string array or null
      
  }  
    
    export default Grammar;