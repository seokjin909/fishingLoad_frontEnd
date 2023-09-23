// import React, { Component } from 'react';
// import Pagination from "react-js-pagination";

// interface Props {
//     page: number;
//     setPage: React.Dispatch<React.SetStateAction<number>>;
//     totalPages: number;
//     totalItem: number;
// }

// class PagingSection extends Component<Props> {
//     handlePageChange = (page: number) => {
//         this.props.setPage(page);
//     }

//     render() {
//         return (
//             <div className='flex flex-col gap-2'>
//                 <Pagination
//                     activePage={this.props.page}
//                     itemsCountPerPage={5}
//                     totalItemsCount={this.props.totalItem}
//                     pageRangeDisplayed={5}
//                     prevPageText={"‹"}
//                     nextPageText={"›"}
//                     onChange={this.handlePageChange}
//                 />
//             </div>
//         );
//     }
// }

// export default PagingSection;
