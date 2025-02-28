import React from "react";
import {SelectItemType} from "@/types/types";



export interface PokeButtonProps {
  selectedList: SelectItemType[],
  setSelectedList: React.Dispatch<React.SetStateAction<SelectItemType[]>>,
}

export interface PokeFooterProps {
  total: number,
  currentPage: number,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
}


export interface FetchTypeProps {
  selectItem: SelectItemType[];
  onSelect: (item: SelectItemType) => void;
}

export interface FetchInfoProps {
  selectedList: SelectItemType[];
  setTotal:React.Dispatch<React.SetStateAction<number>>;
}

export interface FetchPokeInfoProps {
  pokemonUrl: string;
}






