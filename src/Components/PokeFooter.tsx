import {PokeFooterProps} from "@/types/PropsType";

export default function PokeFooter({currentPage, setCurrentPage, total}: PokeFooterProps) {

  return (
    <div className="flex justify-center gap-4 py-4">
      {
        currentPage > 1 && (
          <button className="rounded bg-blue-500 px-4 py-2 text-white" onClick={() => {
            setCurrentPage(currentPage - 1)
          }}>Previous
          </button>
        )
      }
      {
        currentPage < total / 24 && (
          <button className="rounded bg-blue-500 px-4 py-2 text-white" onClick={() => {
            setCurrentPage(currentPage + 1)
          }}>Next
          </button>
        )
      }
    </div>
  );
}
