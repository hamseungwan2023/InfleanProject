
export type TPostList = {
  dtos: TPostItem[], //페이지별 데이터 리스트
  currentPage: number, // 현재 페이지
  totalPage: number  // 전체 페이지
}

export type TPostItem = {
  id: number; //게시글 id
  title: string;  //제목
  category: string;  // 카테고리
  createdAt: string;  // 생성일
  writer: string;   // 작성자 닉네임
  rank: number;   // 작성자 등급(추천 수에 따름)
  finalLike: number;  // 추천 수- 비추천 수
  thumbnailUrl: string;  // 썸네일 url
  contentCount: number;  // 댓글 수
  isNotification : boolean; // 공지글 여부
}

export const postListData:TPostItem[] = [
  {
    id: 23,
    title: "[공지] 멤버 등급 요구 조건",
    category: "시사",
    createdAt: "2024-01-04T18:15:30",
    writer: "관리자1",
    rank: 0,
    finalLike: 22,
    thumbnailUrl: "https://opgg-com-image.akamaized.net/attach/images/20240103063850.2121435.jpg?image=w_200",
    contentCount: 13,
    isNotification : true,
  },
  {
    id: 23,
    title: "[공지] 게시글 규정",
    category: "시사",
    createdAt: "2024-01-01T19:15:30",
    writer: "관리자2",
    rank: 0,
    finalLike: 22,
    thumbnailUrl: "https://opgg-com-image.akamaized.net/attach/images/20240103063850.2121435.jpg?image=w_200",
    contentCount: 13,
    isNotification : true,
  },{
    id: 23,
    title: "게시글",
    category: "시사",
    createdAt: "2023-12-23T19:15:30",
    writer: "작성자123",
    rank: 0,
    finalLike: 22,
    thumbnailUrl: "https://opgg-com-image.akamaized.net/attach/images/20240103063850.2121435.jpg?image=w_200",
    contentCount: 13,
    isNotification : false,
  },{
    id: 23,
    title: "요즘 유행한다는 띠부씰.jpg",
    category: "시사",
    createdAt: "2024-01-02T19:15:31",
    writer: "작성자123",
    rank: 0,
    finalLike: 22,
    thumbnailUrl: "https://opgg-com-image.akamaized.net/attach/images/20240103063850.2121435.jpg?image=w_200",
    contentCount: 13,
    isNotification : false,
  },{
    id: 23,
    title: "요즘 유행한다는 띠부씰.jpg2",
    category: "시사",
    createdAt: "2024-01-04T21:11:31",
    writer: "작성자123",
    rank: 0,
    finalLike: 22,
    thumbnailUrl: "https://opgg-com-image.akamaized.net/attach/images/20240103063850.2121435.jpg?image=w_200",
    contentCount: 13,
    isNotification : false,
  },{
    id: 23,
    title: "요즘 유행한다는 띠부씰.jpg1",
    category: "시사",
    createdAt: "2024-01-04T21:11:32",
    writer: "작성자123",
    rank: 0,
    finalLike: 22,
    thumbnailUrl: "https://opgg-com-image.akamaized.net/attach/images/20240103063850.2121435.jpg?image=w_200",
    contentCount: 13,
    isNotification : false,
  },{
    id: 23,
    title: "요즘 유행한다는 띠부씰.jpg3",
    category: "시사",
    createdAt: "2024-01-04T21:11:31",
    writer: "작성자123",
    rank: 0,
    finalLike: 22,
    thumbnailUrl: "https://opgg-com-image.akamaized.net/attach/images/20240103063850.2121435.jpg?image=w_200",
    contentCount: 13,
    isNotification : false,
  },{
    id: 23,
    title: "요즘 유행한다는 띠부씰.jpg4",
    category: "시사",
    createdAt: "2024-01-04T21:11:03",
    writer: "작성자123",
    rank: 0,
    finalLike: 22,
    thumbnailUrl: "https://opgg-com-image.akamaized.net/attach/images/20240103063850.2121435.jpg?image=w_200",
    contentCount: 13,
    isNotification : false,
  },{
    id: 23,
    title: "요즘 유행한다는 띠부씰.jpg5",
    category: "시사",
    createdAt: "2024-01-04T21:11:02",
    writer: "작성자123",
    rank: 0,
    finalLike: 22,
    thumbnailUrl: "https://opgg-com-image.akamaized.net/attach/images/20240103063850.2121435.jpg?image=w_200",
    contentCount: 13,
    isNotification : false,
  },{
    id: 23,
    title: "요즘 유행한다는 띠부씰.jpg6",
    category: "시사",
    createdAt: "2024-01-04T21:11:01",
    writer: "작성자123",
    rank: 0,
    finalLike: 22,
    thumbnailUrl: "https://opgg-com-image.akamaized.net/attach/images/20240103063850.2121435.jpg?image=w_200",
    contentCount: 13,
    isNotification : false,
  },
]

export const realPostListData:TPostList[] = [
  {
    dtos: postListData,
    currentPage: 0,
    totalPage: 10
  },
  {
    dtos: postListData,
    currentPage: 1,
    totalPage: 10
  },
  {
    dtos: postListData,
    currentPage: 2,
    totalPage: 10
  },
  {
    dtos: postListData,
    currentPage: 3,
    totalPage: 10
  },
  {
    dtos: postListData,
    currentPage: 4,
    totalPage: 10
  },
  {
    dtos: postListData,
    currentPage: 5,
    totalPage: 10
  },
  {
    dtos: postListData,
    currentPage: 6,
    totalPage: 10
  },
  {
    dtos: postListData,
    currentPage: 7,
    totalPage: 10
  },
  {
    dtos: postListData,
    currentPage: 8,
    totalPage: 10
  },
  {
    dtos: postListData,
    currentPage: 9,
    totalPage: 10
  },
  {
    dtos: postListData,
    currentPage: 10,
    totalPage: 10
  }
]