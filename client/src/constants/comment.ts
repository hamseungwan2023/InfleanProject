export type TComment = {
  id: number;   //댓글 id
  postId: number; // 게시글 id
  parentCommentId: number;  // 부모 댓글 id (계층 0인경우 0)
  parentWriter: string;   // 부모 댓글 작성자
  level: number;  // 계층
  order: number;  // 순서
  like: number; //추천 수
    //createdAt: Date;    //작성일
  content: string; //내용
  // 추가할 것: 댓글 첨부 이미지 url (시간없으면 패스)
}