import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) => {
    const getPageNumbers = () => {
        const pageNumbers = [];
        const visiblePages = 5; // How many pages to show around the current page

        if (totalPages <= visiblePages + 2) {
            // If total pages is small, show all of them
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            pageNumbers.push(1);

            // Calculate the range of pages to show around the current page
            let startPage = Math.max(
                2,
                currentPage - Math.floor((visiblePages - 2) / 2)
            );
            let endPage = Math.min(
                totalPages - 1,
                currentPage + Math.floor((visiblePages - 1) / 2)
            );

            if (currentPage > totalPages - Math.floor(visiblePages / 2) - 1) {
                startPage = totalPages - visiblePages;
            }

            if (currentPage < visiblePages) {
                endPage = visiblePages;
            }

            // Add ellipsis if there's a gap after the first page
            if (startPage > 2) {
                pageNumbers.push("...");
            }

            // Add the pages in the calculated range
            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(i);
            }

            // Add ellipsis if there's a gap before the last page
            if (endPage < totalPages - 1) {
                pageNumbers.push("...");
            }

            // Always show the last page
            pageNumbers.push(totalPages);
        }

        return pageNumbers;
    };

    const pageNumbersToRender = getPageNumbers();

    return (
        <div className="flex justify-center items-center gap-2 mt-8">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 border rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
                <FaChevronLeft />
                Previous
            </button>

            {pageNumbersToRender.map((number, index) =>
                typeof number === "string" ? (
                    <span key={`ellipsis-${index}`} className="px-4 py-2">
                        {number}
                    </span>
                ) : (
                    <button
                        key={number}
                        onClick={() => onPageChange(number)}
                        className={`px-4 py-2 border rounded-md cursor-pointer ${currentPage === number
                                ? "bg-[#00004C] text-white border-[#00004C]"
                                : "hover:bg-gray-100"
                            }`}
                    >
                        {number}
                    </button>
                )
            )}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
                Next
                <FaChevronRight />
            </button>
        </div>
    );
};

export default Pagination;
