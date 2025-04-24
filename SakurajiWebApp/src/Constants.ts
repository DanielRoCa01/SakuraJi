import { Component } from "react";
import KanaComponent from "./Components/appendix/KanaComponent";
import ListaContadores, { Count } from "./Components/appendix/Count";

export const LOGO_IMG="https://sdmntprwestus.oaiusercontent.com/files/00000000-a82c-5230-a97e-dc8453c33848/raw?se=2025-04-24T09%3A33%3A10Z&sp=r&sv=2024-08-04&sr=b&scid=098d71ce-4246-5c32-b9dd-08dfa3b907b5&skoid=dfdaf859-26f6-4fed-affc-1befb5ac1ac2&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-04-24T03%3A28%3A48Z&ske=2025-04-25T03%3A28%3A48Z&sks=b&skv=2024-08-04&sig=Rqz4lO2fmiVsJO3S6mU3c6V6SNQ0PjibdfXpRVa214Q%3D"
export const ENTRIES_ENDPOINT=`http://localhost:8080/api/japanese`
export  const LANGUAGE_ENDPOINT=`http://localhost:8080/api/languages`
export  const APPEND_ENDPOINT=`http://localhost:8080/api/japanese/appendix/`
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
