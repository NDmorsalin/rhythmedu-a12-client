const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handlePrevPage = () => {
    if (!isFirstPage) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (!isLastPage) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center justify-center ">
      <button
        className={`${
          isFirstPage ? "opacity-50 cursor-not-allowed" : ""
        } bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-l`}
        onClick={handlePrevPage}
        disabled={isFirstPage}
      >
        Prev
      </button>
      <div className="flex mx-4">
        <span className="text-gray-700 font-semibold">{currentPage}</span>
        <span className="text-gray-500"> / {totalPages}</span>
      </div>
      <button
        className={`${
          isLastPage ? "opacity-50 cursor-not-allowed" : ""
        } bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-r`}
        onClick={handleNextPage}
        disabled={isLastPage}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
