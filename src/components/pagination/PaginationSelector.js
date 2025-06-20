"use client";

import { useSearchParams, useRouter } from "next/navigation";

const PaginationSelector = ({ meta, onPageChange }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  console.log(meta)
;
  const currentPage = Number(meta?.CurrentPage || 1);
  const pageSize = Number(meta?.PageSize || 10);
  const totalCount = Number(meta?.TotalCount || 0);

  const goToPage = (newPage) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("pageNumber", newPage.toString());

    router.push(`?${params.toString()}`);

    if (onPageChange) {
      onPageChange(newPage);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    goToPage(currentPage + 1);
  };

  const entryStart = totalCount === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const entryEnd = Math.min(currentPage * pageSize, totalCount);

  return (
    <div className="flex flex-col items-center">
      <span className="text-sm text-gray-700 dark:text-gray-400">
        Showing{" "}
        <span className="font-semibold text-gray-900 dark:text-white">{entryStart}</span>{" "}
        to{" "}
        <span className="font-semibold text-gray-900 dark:text-white">{entryEnd}</span>{" "}
        of{" "}
        <span className="font-semibold text-gray-900 dark:text-white">{totalCount}</span>{" "}
        Entries
      </span>
      <div className="inline-flex mt-2 xs:mt-0">
        <button
          onClick={goToPrevPage}
          disabled={meta.hasPrevious}
          className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 disabled:opacity-50"
        >
          <svg className="w-3.5 h-3.5 me-2 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
          </svg>
          Prev
        </button>
        <button
          onClick={goToNextPage}
          disabled={meta.hasNext}
          className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 disabled:opacity-50"
        >
          Next
          <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PaginationSelector;
