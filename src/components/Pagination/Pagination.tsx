import './Pagination.scss';
import React, { memo } from 'react';
import ReactPaginate from 'react-paginate';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../helpers/searchHelpers';

type Props = {
  pageCount: number;
};

export const Pagination: React.FC<Props> = memo(({ pageCount }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = +(searchParams.get('page') || 0);

  const handleClick = (selectedItem: { selected: number }) => {
    const newPage = selectedItem.selected.toString();
    const params = getSearchWith(searchParams, { page: newPage });

    setSearchParams(params);
  };

  return (
    <ReactPaginate
      onPageChange={handleClick}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      pageCount={pageCount}
      pageClassName="page-item"
      pageLinkClassName="page-link"
      previousLabel="<"
      previousClassName="page-item"
      previousLinkClassName="page-link"
      nextLabel=">"
      nextClassName="page-item"
      nextLinkClassName="page-link"
      breakLabel="..."
      breakClassName="page-item"
      breakLinkClassName="page-link"
      containerClassName="pagination"
      activeClassName="active"
      forcePage={currentPage}
      renderOnZeroPageCount={null}
    />
  );
});
