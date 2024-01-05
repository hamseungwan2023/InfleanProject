import { TComment } from "../constants/comment";

export const countComment = (commentList:TComment[]) => {
  let count = 0;

  commentList.forEach((item) => {
    count ++;
    item.replyCommentList?.forEach((replyItem) => {
      count ++;
    })
  })

  return count;
}