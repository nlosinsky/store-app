import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';

const PaginationContainer = () => {
  const { meta } = useLoaderData();
  const { page, pageCount } = meta.pagination;
  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  const pages = Array.from({ length: pageCount }, (_, index) => {
    return index + 1;
  });

  const handlePageChange = (pageNumber: number) => {
    const params = new URLSearchParams(search);
    params.set('page', pageNumber.toString());
    navigate(`${pathname}?${params.toString()}`);
  }

  if (pageCount < 2) {
    return null
  }

  return (
    <div className="mt-16 flex justify-end">
      <div className="join">
        <button className="btn btn-xs sm:btn-md join-item"
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
        >PREV
        </button>

        {
          pages.map(pageNumber => {
            return (
              <button
                key={pageNumber}
                className={`btn btn-xs sm:btn-md border-none join-item ${pageNumber === page ? 'bg-base-300 border-base-300' : ''}`}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            )
          })
        }
        <button className="btn btn-xs sm:btn-md join-item"
                onClick={() => handlePageChange(page + 1)}
                disabled={page === pageCount}
        >NEXT
        </button>

      </div>

    </div>
  );
};

export default PaginationContainer;
