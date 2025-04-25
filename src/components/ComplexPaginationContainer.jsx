import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

const ComplexPaginationContainer = () => {
  const { meta } = useLoaderData();
  const { page, pageCount } = meta.pagination;
  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    if (!pageNumber) {
      return;
    }
    const params = new URLSearchParams(search);
    params.set('page', pageNumber);
    navigate(`${pathname}?${params.toString()}`);
  }

  const addPageButton = (key, text, pageNumber) => {
    return (
      <button
        key={key}
        className={`btn btn-xs sm:btn-md border-none join-item ${pageNumber === page ? 'bg-base-300 border-base-300' : ''}`}
        onClick={() => handlePageChange(pageNumber)}
      >
        {text}
      </button>
    )
  }

  const renderPageButtons = () => {
    const map = new Map();

    if (page > 1) {
      map.set('PREV', {
        label: 'PREV',
        page: page - 1
      });
    }

    map.set(1, {
      label: 1,
      page: 1
    });

    if ((page - 1) > 1) {
      map.set('dots1', {
        label: '...',
        page: null
      });
    }

    map.set(page, {
      label: page,
      page: page
    });

    if ((pageCount - page) > 1) {
      map.set('dots2', {
        label: '...',
        page: null
      });
    }

    map.set(pageCount, {
      label: pageCount,
      page: pageCount
    });

    if (page < pageCount) {
      map.set('NEXT', {
        label: 'NEXT',
        page: page + 1
      });
    }

    return [...map.entries()].map(([key, value]) => {
      return addPageButton(key, value.label, value.page);
    })

  }

  if (pageCount < 2) {
    return null
  }

  return (
    <div className="mt-16 flex justify-end">
      <div className="join">
        {renderPageButtons()}
      </div>
    </div>
  );
};

export default ComplexPaginationContainer;
