import React from 'react'
import Pagination from "react-js-pagination";

interface Props {
    page : number;
    setPage : React.Dispatch<React.SetStateAction<number>>;
    totalPages: number;
    totalItem:number;
}

const PagingSection = ({page, setPage, totalPages, totalItem}:Props) => {
    const handlePageChange = (page:number) => {
        setPage(page);
    }
  return (
    <div className='flex flex-col gap-2'>
        <Pagination
        activePage={page} // 현재 페이지
        itemsCountPerPage={5} // 한 페이지랑 보여줄 아이템 갯수
        totalItemsCount={totalItem} // 총 아이템 갯수
        pageRangeDisplayed={5} // paginator의 페이지 범위
        prevPageText={"‹"} // "이전"을 나타낼 텍스트
        nextPageText={"›"} // "다음"을 나타낼 텍스트
        onChange={handlePageChange} // 페이지 변경을 핸들링하는 함수
        />
    </div>
  )
}

export default PagingSection