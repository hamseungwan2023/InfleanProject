
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
  location: string;
}
