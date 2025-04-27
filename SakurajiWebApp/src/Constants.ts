import { Component } from "react";
import KanaComponent from "./Components/appendix/KanaComponent";
import ListaContadores, { Count } from "./Components/appendix/Count";

export const LOGO_IMG="https://daroca-aws-demo-s3.s3.eu-west-1.amazonaws.com/Sakuraji/assets_comunes/logo.png"
export const ENTRIES_ENDPOINT=`http://localhost:8080/api/lessons/japanese`
export const ENDPOINT=`http://localhost:8080/api`
export  const LANGUAGE_ENDPOINT=`http://localhost:8080/api/languages`
export  const APPEND_ENDPOINT=`http://localhost:8080/api/japanese/appendix/`
export const CATEGORY_VOCABULARY = "Vocabulary";
export const CATEGORY_GRAMMAR = "Grammar";
type AppendixComponentMap = {
  [key: string]: React.ComponentType<Component>;
};
export const appendixComponentsList: AppendixComponentMap = {
    kana: KanaComponent,
    counters:ListaContadores
  };

 export interface AppendixProps {
    appendixName:string;
  }
