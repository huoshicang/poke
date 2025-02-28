'use client'

import PokeHeader from "@/Components/PokeHeader";
import PokeFooter from "@/Components/PokeFooter";
import PokeContent from "@/Components/Content/PokeContent";


export default function Home() {


  return (
    <div className="pl-25 pr-25">
      <PokeHeader />
      <PokeContent />
    </div>
  );
}
