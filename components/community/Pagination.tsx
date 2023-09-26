import React from 'react';

interface Props {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  totalItem: number;
}

const BUTTON_STYLE = "flex items-center justify-center px-3 h-8 leading-tight text-black bg-white rounded-md hover:bg-blue-600 hover:text-white ";
const SELECTED_BUTTON_STYLE = "flex items-center justify-center px-3 h-8 leading-tight text-white bg-blue-600 rounded-md";

const Pagination = ({ page, setPage, totalPages, totalItem }: Props) => {
  const renderPageButtons = () => {
    const buttons = [];

    // 페이지네이션의 시작 페이지와 끝 페이지 계산
    const maxPagesToShow = 10; // 한 번에 보여줄 최대 페이지 수
    const startPage = Math.max(1, page - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <li key={i}>
          <button
            className={`flex items-center justify-center px-3 h-8 leading-tight ${
              page === i
                ? SELECTED_BUTTON_STYLE
                : BUTTON_STYLE
            }`}
            onClick={() => setPage(i)}
          >
            {i}
          </button>
        </li>
      );
    }
    return buttons;
  };

  return (
    <nav aria-label="Page navigation example">
      <ul className="flex items-center -space-x-px h-8 text-md font-bold gap-2">
        {page === 1 ? (
          <></>
        ) : (
          <li>
            <button
              className={BUTTON_STYLE}
              onClick={() => setPage((prev) => prev - 1)}
            >
              <span>이전</span>
            </button>
          </li>
        )}
        {renderPageButtons()}
        {page === totalPages ? (
          <></>
        ) : (
          <li>
            <button
              className={BUTTON_STYLE}
              onClick={() => setPage((prev) => prev + 1)}
            >
              <span>다음</span>
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
