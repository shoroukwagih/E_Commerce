import React, { useState } from "react";
import { Pagination } from "react-bootstrap";

const PaginatedList = ({ paginationFun }) => {

  const [currentPage, setCurrentPage] = useState(1);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    paginationFun(pageNumber);
  };

  return (
    <div>
      <Pagination>
        {Array.from({ length: 5 }).map(
          (_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          )
        )}
      </Pagination>
    </div>
  );
};

export default PaginatedList;
