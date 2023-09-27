import React, { useState } from 'react';
import {
  AiFillHeart,
  AiOutlineHeart,
} from 'react-icons/ai';
import { BiSolidPencil } from 'react-icons/bi';
import { BsArrowReturnRight } from 'react-icons/bs';
import { Comment, Store } from '@/types/store';
import MyModal from '../common/DeleteModal';
import { updateComment } from '@/pages/api/comment/updateComment'; 
import { deleteComment } from '@/pages/api/comment/deleteComment'; 
import { putComment } from '@/pages/api/comment/putComment';
import { postReplyComment } from '@/pages/api/comment/postReplyComment';
import { toast } from 'react-toastify';

interface Props {
  data: Comment;
  userId: string;
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>; 
  store:Store;
}

// store : 게시글 정보, data : 댓글 상세 정보, comments : 댓글 리스트 정보

const CommentComp = ({ data, userId, setComments, comments,store }: Props) => {
  console.log("CommentComp",data);
  const [isEditing, setIsEditing] = useState(false); 
  const [editedComment, setEditedComment] = useState(data.comment); 

  // 댓글 수정 함수
  const editComment = async () => {
    try {
      const response = await updateComment(data.id, {
        postId: data.id,
        comment: editedComment,
      });
      if (response?.status === 200) {
        toast.success('댓글 수정 완료');
        setIsEditing(false);
        const updatedComments = comments.map(comment => {
          if(comment.id === response.data.id) {
            return {
              ...comment,
              comment: response.data.comment,
            } 
          } else {
            return comment;
          }
        })
        setComments(updatedComments);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 댓글 삭제 함수
  const deleteCommentHandler = async () => {
    try {
      const response = await deleteComment(data.id);
      if (response?.status === 200) {
        toast.success('댓글 삭제 완료');
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.id !== data.id)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 댓글 좋아요 함수
  const putCommentHandler = async () => {
    try {
      const response = await putComment(data.id);
      if (response?.status === 200) {
        toast.success(response?.data.message);
        const updatedComments = comments.map((comment) => {
          if (comment.id === data.id) {
            const postLikeNum = comment.commentLike;
            const newCommentLike = comment.commentLikeUse ? postLikeNum - 1 : postLikeNum + 1;
            return {
              ...comment,
              commentLike: newCommentLike,
              commentLikeUse: !comment.commentLikeUse,
            };
          }
          return comment;
        });
        setComments(updatedComments);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* 대댓글 관련 함수들 */

  // 대댓글 처리 관련 함수
  const [isReplying, setIsReplying] = useState(false); 
  const [replyText, setReplyText] = useState('');

  // 대댓글 작성 폼 표시/숨김 토글 함수
  const toggleReplying = () => {
    setIsReplying(!isReplying);
  };

  // 대댓글 작성 함수
  const replyComment = async () => {
    try {
      if(!replyText.trim().length) {
        toast.info('댓글을 입력하세요 😂');
        return;
      }
      // 서버에 대댓글 데이터를 전송하는 API 호출 및 응답 처리
      // 새로운 대댓글 데이터를 서버에서 받아온다고 가정
      const response = await postReplyComment(data.id, {
        postId: store.id,
        comment: replyText,
      });
      if (response?.status === 200) {
        toast.success('댓글 등록 완료');
        const newComment: Comment = {
          createdTime: response.data.createdTime, // 수정: response.data.createTile -> response.data.createdTime
          modifiedTime: response.data.modifiedTime, // 수정: response.data.modifiedTIme -> response.data.modifiedTime
          id: response.data.id,
          comment: response.data.comment,
          accountId: response.data.accountId,
          commentLike: response.data.commentLike,
          commentLikeUse: true, // 예제로 true로 초기화
          commentUse: true, // 예제로 true로 초기화
          childcommentList: [], // 새로운 댓글은 대댓글을 가질 수 없으므로 빈 배열
        };
  
        const updatedComments = comments.map(comment => {
          if (comment.id === data.id) {
            const updatedChildcommentList = [...comment.childcommentList, newComment];
            return { ...comment, childcommentList: updatedChildcommentList };
          }
          return comment;
        });
  
        // setComments 함수를 호출하기 전에 다른 상태를 업데이트합니다.
        setIsReplying(false);
        setReplyText('');
        setComments(updatedComments);
      }
    } catch (error) {
      console.log(error);
    }
  };

    // 대댓글 삭제 함수
    const deleteChildCommentHandler = async (id:number) => {
      try {
        const response = await deleteComment(id);
        if (response?.status === 200) {
          toast.success('댓글 삭제 완료');
          setComments((prevComments) => {
            const updatedComments = prevComments.map((comment) => ({
              ...comment,
              childcommentList: comment.childcommentList.filter((item) => item.id !== id),
            }));
            return updatedComments;
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    const [editedChildCommentId, setEditedChildCommentId] = useState<number | null>(null);
  const [editedChildComment, setEditedChildComment] = useState<string>('');

  // 대댓글 수정 시작
  const startEditingChildComment = (commentId: number, commentText: string) => {
    setEditedChildCommentId(commentId);
    setEditedChildComment(commentText);
  };

  // 대댓글 수정 완료
  const finishEditingChildComment = async (commentId: number) => {
    try {
      // 서버에 대댓글 수정 데이터를 전송하는 API 호출 및 응답 처리
      const response = await updateComment(commentId, {
        postId: data.id,
        comment: editedChildComment,
      });

      if (response?.status === 200) {
        toast.success('댓글 수정 완료');
        setEditedChildCommentId(null);

        const updatedComments = comments.map(comment => {
          if (comment.id === data.id) {
            const updatedChildcommentList = comment.childcommentList.map(childComment => {
              if (childComment.id === commentId) {
                return {
                  ...childComment,
                  comment: response.data.comment,
                };
              }
              return childComment;
            });
            return { ...comment, childcommentList: updatedChildcommentList };
          }
          return comment;
        });

        setComments(updatedComments);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex justify-between border-t py-2 mt-2">
        <div className="flex gap-4 items-center">
          <div className='font-bold'>{data.accountId}</div>
          {isEditing ? (
            <input
              id="editedComment"
              name="editedComment"
              className="w-full block p-1 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
              value={editedComment}
              onChange={(e) => setEditedComment(e.target.value)}
            />
          ) : (
            <div>{data.comment}</div>
          )}
        </div>
        {userId === data.accountId ? (
          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <button
                  className="rounded-md py-1 px-2 bg-blue-300 text-white"
                  onClick={editComment}
                >
                  수정
                </button>
                <button
                  className="rounded-md py-1 px-2 bg-red-300 text-white"
                  onClick={() => setIsEditing(false)}
                >
                  취소
                </button>
              </>
            ) : (
              <>
                <BiSolidPencil
                  onClick={() => setIsEditing(true)}
                  style={{ cursor: 'pointer' }}
                />
                <MyModal type='댓글' func={deleteCommentHandler} />
              </>
            )}
          </div>
        ) : (
          <div className='cursor-pointer'>
          {data.commentLikeUse ? (<AiFillHeart onClick={putCommentHandler} />):(<AiOutlineHeart onClick={putCommentHandler} />)}
        </div>
        )}
      </div>
      <div>
        {/* map을 사용해서 반복적으로 뿌릴거라면 컴포넌트로 분리하는 것이 좋아 보임! */}
        {data.childcommentList && data.childcommentList.filter((item) => item.commentUse === true).map((item) => {
          return (
            <div key={item.id} className='flex justify-between'>
              <div className='ml-4 flex gap-4 items-center'>
                <BsArrowReturnRight />
                <div className='font-bold'>{item.accountId}</div>
                {editedChildCommentId === item.id ? (
                  // 대댓글 수정 입력 필드
                  <input
                    className="w-full block p-1 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                    value={editedChildComment}
                    onChange={(e) => setEditedChildComment(e.target.value)}
                  />
                ) : (
                  // 대댓글 내용
                  <div>{item.comment}</div>
                )}
              </div>
              <div className='flex gap-2 items-center'>
                {userId === item.accountId ? (
                  <>
                    {editedChildCommentId === item.id ? (
                      // 수정 완료 버튼
                      <>
                      <button
                        className="rounded-md py-1 px-2 bg-blue-300 text-white"
                        onClick={() => finishEditingChildComment(item.id)}
                      >
                        수정
                      </button>
                      <button
                        className="rounded-md py-1 px-2 bg-red-300 text-white"
                        onClick={() => startEditingChildComment(0,"")}
                      >취소</button>
                      </>
                    ) : (
                      // 수정 시작 버튼
                      <>
                      <BiSolidPencil style={{ cursor: 'pointer' }}
                        onClick={() => startEditingChildComment(item.id, item.comment)}
                      />
                    {/* 삭제 버튼 */}
                    <MyModal type='댓글' func={() => deleteChildCommentHandler(item.id)} />
                      </>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          )
        })}
      </div>
      {isReplying ? (
        <div className="flex gap-2 mt-2 ">
          <textarea
            id="replyText"
            name="replyText"
            rows={1}
            className="w-full block py-1 px-2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder='댓글을 입력하세요'
          />
          <button
            className="rounded-md bg-blue-300 text-white py-1 px-2 w-16"
            onClick={replyComment}
          >
            등록
          </button>
          <button
            className="rounded-md bg-red-300 text-white py-1 px-2 w-16"
            onClick={toggleReplying}
          >
            취소
          </button>
        </div>
      ) : (<></>)}
        <div className="flex items-center gap-2 mt-2">
        {/* 좋아요 이벤트 처리 해야함! */}
        <div className="font-thin">좋아요 {data.commentLike}개</div>
        <button onClick={toggleReplying}>댓글 달기</button>
      </div>
    </div>
  );
};

export default CommentComp;
