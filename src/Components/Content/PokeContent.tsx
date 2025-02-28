import PokeButton from "@/Components/Content/PokeButton";
import React, {useState} from "react";
import {SelectItemType} from "@/types/types";
import {FetchInfoComponent} from "@/fetchData/fetchInfo";


export default function PokeContent() {

  const [total, setTotal] = useState<number>(0);
  const [selectedList, setSelectedList] = useState<SelectItemType[]>([]);


  return (
    <div>
      <div className="p-2 m-2"> Total: {total} </div>
      <PokeButton selectedList={selectedList} setSelectedList={setSelectedList}/>

      <FetchInfoComponent selectedList={selectedList} setTotal={setTotal}/>
    </div>
  );
}
