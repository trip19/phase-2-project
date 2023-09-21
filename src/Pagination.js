import React from 'react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div id="pagination">
      <button
        id="previous"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      Page {currentPage} of {totalPages}
      <button
        id="next"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
