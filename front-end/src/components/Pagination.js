import React from "react";
import * as R from "ramda";
import "../styles/pagination.css";

const Pagination = ({ filesPerPage, totalFiles, paginate }) => {
  const mapIndexed = R.addIndex(R.map);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalFiles / filesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {mapIndexed((number) => {
          return (
            <li key={number} className="page-item">
              <a
                href="/#"
                onClick={() => paginate(number)}
                className="page-link"
              >
                {number}
              </a>
            </li>
          );
        }, pageNumbers)}
      </ul>
    </nav>
  );
};

export default Pagination;
