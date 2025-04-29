
import KanaComponent from "./Components/appendix/KanaComponent";
import ListaContadores from "./Components/appendix/Count";

export const LOGO_IMG="https://daroca-aws-demo-s3.s3.eu-west-1.amazonaws.com/Sakuraji/assets_comunes/logo.png"
export const API_URL = import.meta.env.VITE_API_URL;

export  const LANGUAGE_ENDPOINT=`${API_URL}/languages`
export  const APPEND_ENDPOINT=`${API_URL}/japanese/appendix/`
export const CATEGORY_VOCABULARY = "Vocabulary";
export const CATEGORY_GRAMMAR = "Grammar";
type AppendixComponentMap = {
  [key: string]: React.ComponentType<{ palabra: string }>;
};

export const appendixComponentsList: AppendixComponentMap = {
    kana: KanaComponent,
    counters:ListaContadores
  };

 export interface AppendixProps {
    appendixName:string;
  }
