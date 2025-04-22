interface Entry {
    type: "Kanji";
    word: string;
    translation: string[] | null; // Can be a string array or null
    meaning: string | null;     // Can be a string or null
    pronunciation: string[] | null; // Can be a string array or null
    url_imagen?: string | null; // Can be a string, null, or undefined (optional)
}  
  
  export default Entry;