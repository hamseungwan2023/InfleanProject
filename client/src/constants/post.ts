export type TPost = {
  id: number; // 게시글 id
  title: string; // 제목
  category: string; //카테고리
  createdAt: string; //작성일
  writerId: string; // 작성자 ID
  writerNickname: string;    // 작성자 닉네임
  rank: number;     // 작성자 등급(레벨) 추천수에 따라 분류.
  views: number;    //조회 수
  like: number;   //추천 수
  dislike: number;   //비추천 수
  finalLike: number;  //  추천 수 - 비추천 수
  content: string;    // 내용
  commentCount: number;   //댓글 수
  location: string;
  //추가할 것 : 이미지,비디오 파일 url list
  //추가할것 : (승완)  updated_at 도 만들어서 created_at이랑 값이다르면 제목 옆에 (수정됨)을 추가하는것도 나쁘지 않아보임 댓글은 대댓글을 제외한 부모 댓글만 (수정됨)
}

export type TPostWrite = {
  id: number;   // 게시글 id
  title: string;    // 제목
  category: string;     //카테고리
  createdAt: string;    //작성일 
  writerId: string; // 작성자 ID
  writerNickname: string;    // 작성자 닉네임
  rank: number;     // 작성자 등급(레벨) 추천수에 따라 분류.
  content: string;    // 내용
  //추가할 것 : 이미지,비디오 파일 url list
}
