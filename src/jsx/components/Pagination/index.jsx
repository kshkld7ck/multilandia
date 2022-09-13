import React from 'react';
import './index.scss';
import Arrow from '../../../assets/images/arrowPrimary.svg'
import ReactPaginate from 'react-paginate';

function Pagination({ nPages, currentPage, setCurrentPage }) {
    const pageNumbers = [...Array(nPages + 1).keys()].slice(1)

    const nextPage = () => {
        if (currentPage !== nPages) setCurrentPage(currentPage + 1)
    }
    const prevPage = () => {
        if (currentPage !== 1) setCurrentPage(currentPage - 1)
    }
    return <div className="pagination">
        <ReactPaginate
            breakLabel="..."
            nextLabel={<img src={Arrow} />}
            onPageChange={(el) => setCurrentPage( el)}
            pageRangeDisplayed={3}
            pageCount={nPages}
            previousLabel={<img src={Arrow} className="reverse" />}
            renderOnZeroPageCount={null}
        />
    </div>
}

export default Pagination