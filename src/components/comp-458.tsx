import { Button } from "@/components/ui/button"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination"
import { useState } from "react";

type PaginationProps = {
  currentPage: number
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Paginator({
  currentPage,
  totalPages,
}: PaginationProps) {
  const [page, setPage] = useState(1);

  function handleNextPage(){ 
    setPage(page + 1);
  };

  function handlePreviousPage(){
    setPage(page - 1);
  }

  return (
    <div className="flex items-center justify-between gap-3">
      <p className="text-muted-foreground grow text-sm" aria-live="polite">
        Página <span className="text-foreground">{currentPage}</span> de{" "}
        <span className="text-foreground">{totalPages}</span>
      </p>
      <Pagination className="w-auto">
        <PaginationContent className="gap-3">
          <PaginationItem>
            <Button
              variant="outline"
              onClick={handlePreviousPage}
              className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
              aria-disabled={currentPage === 1 ? true : undefined}
            >
                Anterior
            </Button>
          </PaginationItem>
          <PaginationItem>
            <Button
              variant="outline"
              onClick={handleNextPage}
              className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
              aria-disabled={currentPage === totalPages ? true : undefined}
            >
                Próxima
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
