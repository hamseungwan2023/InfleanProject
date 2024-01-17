import moment from "moment";
import { TComment } from "../constants/comment";


// 댓글 게시글 최신 인기순 반환 함수 리스트

// 시간 순 반환 
export const sortArrByDate = (arr: any[]) => {
  let tempArr = [...arr];
  return tempArr.sort((a, b) => -moment(a.createdAt).diff(moment(b.createdAt)));
}

// 댓글 / 대댓글 계층에 따른 순서 반영 후 반환 
export const filterCommentByRecent = (commentList : TComment[]) => {
  let tempArr = [...commentList];
  tempArr = sortArrByDate(tempArr);
  tempArr.forEach((item, index, arr) => {
    if(item.replyCommentList){
      sortArrByDate(item.replyCommentList);
    }
  })

  return tempArr;
}

// 댓글, 게시글 인기 순 반환 함수 
const filterByLikes = (list : TComment[]) => {
  list.sort((a, b) => b.like - a.like);
  return list;
}

//댓글 인기순 반환
export const filterCommentByLikes = (commentList: TComment[]) => {

  filterByLikes(commentList);
  return commentList;
}