import Entry from "./Entry";
import Grammar from "./Grammar";

export interface Unit  {
    number: number;
    
    entries: Entry[];
    grammars:Grammar[];
  };