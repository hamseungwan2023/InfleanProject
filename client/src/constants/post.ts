export type TPost = {
  id: number;   // 게시글 id
  title: string;    // 제목
  category: string;     //카테고리
  createdAt: string;    //작성일
  writerId: string; // 작성자 ID
  writerNickname: string;    // 작성자 닉네임
  rank: number;     // 작성자 등급(레벨) 추천수에 따라 분류.
  views: number;    //조회 수
  like: number;   //추천 수
  dislike: number;   //비추천 수
  finalLike: number;  //  추천 수 - 비추천 수
  content: string;    // 내용
  commentCount: number;   //댓글 수
  //추가할 것 : 이미지,비디오 파일 url list
}

export const postDetailData:TPost = {
  id: 23,
  title: "제목입니다.",
  category: "시사",
  createdAt: "2024-01-02T10:15:30",
  writerId: "asd123",
  writerNickname: "세종대왕",
  rank: 0,
  views: 123,
  like: 23,
  dislike: 1,
  finalLike: 22,
  content: "로렘 입숨(lorem ipsum; 줄여서 립숨, lipsum)은 출판이나 그래픽 디자인 분야에서 폰트, 타이포그래피, 레이아웃 같은 그래픽 요소나 시각적 연출을 보여줄 때 사용하는 표준 채우기 텍스트로, 최종 결과물에 들어가는 실제적인 문장 내용이 채워지기 전에 시각 디자인 프로젝트 모형의 채움 글로도 이용된다. 이런 용도로 사용할 때 로렘 입숨을 그리킹(greeking)이라고도 부르며, 때로 로렘 입숨은 공간만 차지하는 무언가를 지칭하는 용어로도 사용된다.  로렘 입숨은 전통 라틴어와 닮은 점 때문에 종종 호기심을 유발하기도 하지만 그 이상의 의미를 담지는 않는다. 문서에서 텍스트가 보이면 사람들은 전체적인 프레젠테이션보다는 텍스트에 담긴 뜻에 집중하는 경향이 있어서 출판사들은 서체나 디자인을 보일 때는 프레젠테이션 자체에 초점을 맞추기 위해 로렘 입숨을 사용한다. 로렘 입숨은 영어에서 사용하는 문자들의 전형적인 분포에 근접하다고도 하는데, 이 점 때문에 프레젠테이션으로 초점을 이동하는 데에도 도움을 준다.",
  commentCount: 12
  // 첨부이미지 
  // 생성시각
}