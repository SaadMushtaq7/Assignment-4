import React from "react";
import "../styles/pagination.css";

export default function Pagination({ filesPerPage, totalFiles, paginate }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalFiles / filesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => {
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
        })}
      </ul>
    </nav>
  );
}
