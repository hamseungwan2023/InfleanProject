import React from "react";
import style from "./PostDetail.module.scss";

const PostDetail = () => {
  return <div className="postDetail">
    <div className={style.title_wrap}>
      <h1 className={style.title}>대설주의보에 굳이 도봉산 올라갔다가 구조</h1>
      <div className={style.title_info}>
        <div className={style.info_wrap}>
          <span className={style.category}>유머</span>
          <span className={style.last_update}>8시간 전</span>
          <span className={style.writter}>
            <i className={style.rank} />
            <span>작성자</span>
          </span>
        </div>
        <div className={style.info_wrap}>
          <span className={style.views}>조회수 2,125</span>
          <span className={style.comment_count}>댓글 6</span>
          <span className={style.recommend_count}>추천 59</span>
        </div>
      </div>
    </div>
    <div className={style.content_wrap}>로렘 입숨(lorem ipsum; 줄여서 립숨, lipsum)은 출판이나 그래픽 디자인 분야에서 폰트, 타이포그래피, 레이아웃 같은 그래픽 요소나 시각적 연출을 보여줄 때 사용하는 표준 채우기 텍스트로, 최종 결과물에 들어가는 실제적인 문장 내용이 채워지기 전에 시각 디자인 프로젝트 모형의 채움 글로도 이용된다. 이런 용도로 사용할 때 로렘 입숨을 그리킹(greeking)이라고도 부르며, 때로 로렘 입숨은 공간만 차지하는 무언가를 지칭하는 용어로도 사용된다.

로렘 입숨은 전통 라틴어와 닮은 점 때문에 종종 호기심을 유발하기도 하지만 그 이상의 의미를 담지는 않는다. 문서에서 텍스트가 보이면 사람들은 전체적인 프레젠테이션보다는 텍스트에 담긴 뜻에 집중하는 경향이 있어서 출판사들은 서체나 디자인을 보일 때는 프레젠테이션 자체에 초점을 맞추기 위해 로렘 입숨을 사용한다.

로렘 입숨은 영어에서 사용하는 문자들의 전형적인 분포에 근접하다고도 하는데, 이 점 때문에 프레젠테이션으로 초점을 이동하는 데에도 도움을 준다.</div>
    <div className={style.recommend_wrap}>
      <button type="button" className={style.btn_recommend}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" data-type="default"><path d="M12.8215 10.4987L8.55564 4.31749C8.48688 4.21791 8.40159 4.13798 8.30561 4.08318C8.20963 4.02837 8.10524 4 7.9996 4C7.89396 4 7.78957 4.02837 7.69359 4.08318C7.59761 4.13798 7.51231 4.21791 7.44355 4.31749L3.17768 10.4987C2.77056 11.0887 3.1081 12 3.73373 12H12.2667C12.8923 12 13.2299 11.0887 12.8215 10.4987Z"></path></svg>
        <span>59</span>
        <span className="blind">추천 수</span>
      </button>
      <button type="button" className={style.btn_recommend}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" data-type="default"><path d="M12.8215 10.4987L8.55564 4.31749C8.48688 4.21791 8.40159 4.13798 8.30561 4.08318C8.20963 4.02837 8.10524 4 7.9996 4C7.89396 4 7.78957 4.02837 7.69359 4.08318C7.59761 4.13798 7.51231 4.21791 7.44355 4.31749L3.17768 10.4987C2.77056 11.0887 3.1081 12 3.73373 12H12.2667C12.8923 12 13.2299 11.0887 12.8215 10.4987Z"></path></svg>
        <span>-1</span>
        <span className="blind">비추천 수</span>
      </button>
    </div>
  </div>
}

export default PostDetail;