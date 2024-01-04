export type TComment = {
  id: number;   //댓글 id - 댓글id는 숫자로 함(생성되는 순서로 1씩 증가)
  postId: number; // 게시글 id
  parentCommentId?: number;  // 부모 댓글 id (부모댓글이 없을 경우 undefined )
  parentCommentNickname?: string;   // 부모 댓글 작성자 닉네임 없으면 undefined
  writerId: string; //댓글 작성자 id
  writerNickname: string; //댓글 작성자 닉네임
  rank: number; // 작성자 등급
  like?: number; //추천 수 (대댓글 아닌 첫번째 댓글만)
    //createdAt: Date;    //작성일 -> 나중에 작성일 기준으로 댓글 순서 나열
  content: string; //내용
  // 추가할 것: 댓글 첨부 이미지 url (시간없으면 패스)
}

export const commentListData:TComment[] = [
  {
    id: 0,
    postId: 23,
    writerId: "asd123", 
    writerNickname: "이순신2",
    rank: 0,
    like: 23,
    content: "안녕하세요. 첫번째 댓글입니다."
  },
  {
    id: 1,
    postId: 23,
    parentCommentId: 1,
    parentCommentNickname: "이순신2",   
    writerId: "asd1234", 
    writerNickname: "이순신3",
    rank: 1,
    content: "안녕하세요. 첫번째 댓글의 대댓글입니다."
  },
  {
    id: 2,
    postId: 23,
    parentCommentId: 1,
    parentCommentNickname: "이순신2",   
    writerId: "asd12345", 
    writerNickname: "이순신4",
    rank: 3,
    content: "안녕하세요. 첫번째 댓글의 대댓글2입니다."
  },
  {
    id: 3,
    postId: 23,
    parentCommentId: 2,
    parentCommentNickname: "이순신4",   
    writerId: "asd123456", 
    writerNickname: "이순신5",
    rank: 2,
    content: "안녕하세요. 첫번째 댓글의 대댓글2의 대댓글1입니다."
  },
  {
    id: 4,
    postId: 23,  
    writerId: "asd1234567", 
    writerNickname: "두번째 댓글 작성자",
    rank: 4,
    like: -2,
    content: "안녕하세요. 두번째 댓글입니다^^"
  },
]