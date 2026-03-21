// components/flights/Pagination.tsx
interface Props {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: Props) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    const visiblePages = pages.filter(
        (p) => p === 1 || p === totalPages || (p >= currentPage - 1 && p <= currentPage + 1)
    );

    return (
        <div className="flex items-center justify-center gap-2 py-6">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded-lg border border-border text-sm text-background disabled:opacity-40 hover:bg-muted transition"
            >
                Prev
            </button>

            {visiblePages.map((page, index) => {
                const prev = visiblePages[index - 1];
                const showEllipsis = prev && page - prev > 1;

                return (
                    <div key={page} className="flex items-center gap-2">
                        {showEllipsis && (
                            <span className="text-muted-foreground text-sm px-1">...</span>
                        )}
                        <button
                            onClick={() => onPageChange(page)}
                            className={`w-8 h-8 rounded-lg text-sm font-medium transition ${
                                currentPage === page
                                    ? 'bg-primary text-primary-foreground'
                                    : 'border border-border text-background hover:bg-muted'
                            }`}
                        >
                            {page}
                        </button>
                    </div>
                );
            })}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 rounded-lg border border-border text-sm text-background disabled:opacity-40 hover:bg-muted transition"
            >
                Next
            </button>
        </div>
    );
};