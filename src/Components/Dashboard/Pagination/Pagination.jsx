
import ReactPaginate from 'react-paginate';
import './pagination.css'


export default function PaginatedItems({ itemsPerPage , perPage , setPage , totalData }) {
const pageCount = totalData / perPage;


  return (
    <>
      
      
      <ReactPaginate
        breakLabel="..."
        nextLabel=">>"
      onPageChange={(e) => setPage(e.selected + 1)}
      
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel="<<"
        renderOnZeroPageCount={null}
        containerClassName="custom-pagination d-flex align-items-end m-0 justify-content-end "
        pageLinkClassName="pagination-tag-anchor mx-2 text-secondary rounded-circle"
        activeLinkClassName="bg-primary text-white " 
      />
     
    </>
  );
}