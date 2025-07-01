import {Button} from "@/components/ui/button";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
} from "@/components/ui/pagination";

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

export default function Paginator({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) {
    function handleNextPage() {
        onPageChange(currentPage + 1);
    }

    function handlePreviousPage() {
        onPageChange(currentPage - 1);
    }

    return (
        <div className="flex items-center justify-between gap-3">
            <p
                className="text-muted-foreground grow text-sm"
                aria-live="polite"
            >
                Página <span className="text-foreground">{currentPage}</span> de{" "}
                <span className="text-foreground">{totalPages}</span>
            </p>
            <Pagination className="w-auto">
                <PaginationContent className="gap-3">
                    <PaginationItem>
                        <Button
                            variant="outline"
                            onClick={handlePreviousPage}
                            disabled={currentPage <= 1}
                        >
                            Anterior
                        </Button>
                    </PaginationItem>
                    <PaginationItem>
                        <Button
                            variant="outline"
                            onClick={handleNextPage}
                            disabled={currentPage >= totalPages}
                        >
                            Próxima
                        </Button>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}
