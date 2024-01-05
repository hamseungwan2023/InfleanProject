export type TComment = {
  id: number;   //댓글 id - 댓글id는 숫자로 함(생성되는 순서로 1씩 증가)
  postId: number; // 게시글 id
  writerId: string; //댓글 작성자 id
  writerNickname: string; //댓글 작성자 닉네임
  rank: number; // 작성자 등급
  like: number; //추천 수
  createdAt: string;    //작성일
  content: string; // 내용
  replyCommentList?: TReplyComment[]; // 대댓글 리스트
  // 추가할 것: 댓글 첨부 이미지 url (시간없으면 패스)
}

export type TReplyComment = {
  id: number; // 대댓글 id
  parentCommentId: number;  // 부모 댓글 id
  parentCommentNickname: string; //부모 댓글 닉네임
  writerId: string; //대댓글 작성자 id
  writerNickname: string; //대댓글 작성자 닉네임
  rank: number; // 작성자 등급
  createdAt: string;    // 작성일
  content: string; // 내용
  // 추가할 것: 댓글 첨부 이미지 url (시간없으면 패스)
}

export const commentListData:TComment[] = [
  {
    id: 1,
    postId: 23,
    writerId: "asd123", 
    writerNickname: "이순신2",
    rank: 0,
    like: 23,
    createdAt: "2024-01-02T10:15:30",
    content: "안녕하세요. 첫번째 댓글입니다.",
    replyCommentList: [
      {
        id: 1,
        parentCommentId: 1,  
        parentCommentNickname: "이순신2",
        writerId: "asd1234", 
        writerNickname: "이순신3",
        rank: 1,
        createdAt: "2024-01-03T10:35:30",
        content: "안녕하세요. 첫번째 댓글의 대댓글입니다."
      },
      {
        id: 2,
        parentCommentId: 1,
        parentCommentNickname: "이순신2",
        writerId: "asd12345", 
        writerNickname: "이순신4",
        rank: 3,
        createdAt: "2024-01-02T10:15:31",
        content: "안녕하세요. 첫번째 댓글의 대댓글2입니다."
      },
      {
        id: 3,
        parentCommentId: 2,
        parentCommentNickname: "이순신4", 
        writerId: "asd123456", 
        writerNickname: "이순신5",
        rank: 2,
        createdAt: "2024-01-01T03:15:30",
        content: "안녕하세요. 첫번째 댓글의 대댓글2의 대댓글1입니다."
      },
    ]
  },
  {
    id: 5,
    postId: 23,  
    writerId: "asd1234567", 
    writerNickname: "두번째 댓글 작성자",
    rank: 41,
    like: -2,
    createdAt: "2024-01-05T20:15:31",
    content: "안녕하세요. 두번째 댓글입니다^^",
  },
  {
    id: 5,
    postId: 23,  
    writerId: "asd1234567", 
    writerNickname: "두번째 댓글 작성자",
    rank: 4,
    like: -23,
    createdAt: "2014-01-05T20:15:30",
    content: "안녕하세요. 두번째 댓글입니다^^",
  },
]