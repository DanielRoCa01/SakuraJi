
interface Language {
    name: string;
    units: number; 
    appendixes: string[] | null; // Can be a string array or null
        // Can be a string or null
    types: string[] ; // Can be a string array or null
    greeting?: string ; // Can be a string, null, or undefined (optional)
}  
  
  export default Language;