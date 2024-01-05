import moment from "moment";
import { TComment } from "../constants/comment";


// 댓글 게시글 최신 인기순 반환 함수 리스트

// 시간 순 반환 
export const sortArrByDate = (arr: any[]) => {
  return arr.sort((a, b) => -moment(a.createdAt).diff(moment(b.createdAt)));
}

// 댓글 / 대댓글 계층에 따른 순서 반영 후 반환 
export const filterCommentByRecent = (commentList : TComment[]) => {
  sortArrByDate(commentList);
  commentList.forEach((item, index, arr) => {
    if(item.replyCommentList){
      sortArrByDate(item.replyCommentList);
    }
  })

  return commentList;
}

// 댓글, 게시글 인기 순 반환 함수 
const filterByLikes = (list : TComment[]) => {
  console.log("@");
  list.sort((a, b) => {
    if(a.like && b.like) {
      //a,b 둘다 추천 수 있을 때
      return b.like-a.like;
    } else if(b.like && !a.like) {
      //b 추천 수 있고, a 추천 수 없을 때
      return -1;
    } else if(!(a.like || b.like)) {
      // 둘다 없을 때 최신 순 나열
      return 1;
    } else {
      //a 추천 수 있고, b 추천 수 없을 때
      return -1;
    }
  });
  return list;
}

//댓글 인기순 반환
export const filterCommentByLikes = (commentList: TComment[]) => {

  filterByLikes(commentList);
  return commentList;
}