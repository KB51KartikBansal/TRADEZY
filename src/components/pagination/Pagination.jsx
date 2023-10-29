import React from 'react';
import classnames from 'classnames';
import { usePagination, DOTS } from './usePagination';
import './pagination.css';
const Pagination = props => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
    totalPages
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
    totalPages
  });
 
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul
      className={classnames('pagination-container', { [className]: className })}
    >
      {currentPage !== 1&&<li
        className={classnames('pagination-item', {
         
        })} data-testid="prev"
        onClick={onPrevious}
      >
        <div className="arrow left" />
      </li>}
      {paginationRange.map((pageNumber, index) => {
         
        if (pageNumber === DOTS) {
          return <li className="pagination-item dots">&#8230;</li>;
        }
		
        return (
          <li 
            key={index}
            className={classnames('pagination-item', {
              selected: pageNumber === currentPage
            })} data-testid={pageNumber}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
     { currentPage !== lastPage&&<li
        className={classnames('pagination-item', {
        })} data-testid="next"
        onClick={onNext}
      >
        <div className="arrow right" />
      </li>
}
    </ul>
  );
};

export default Pagination;