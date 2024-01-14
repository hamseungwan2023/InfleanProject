import React, { useRef } from "react";
import ListLoading from "../common/ListLoading";
import style from "./Note.module.scss";

const NoteWrite = () => {
  const subSearchRef = useRef<HTMLInputElement>(null);

  const onClickInputSide = (e: React.MouseEvent<HTMLDivElement>) => {
    subSearchRef.current?.focus();
  }

  return <div className={style.note_write}>
    <h1 className={style.note_write_title}>
      쪽지 보내기
    </h1>
    <div className={style.body}>
      <div className={style.toBox}>
        <label htmlFor="sender">받는 사람</label>
        <div className={style.input_side} onClick={onClickInputSide}>
          <input type="text" id="sender" value="" placeholder="다중 전송은 스페이스 바로 구분해 주세요." className={style.main_search}/>
          <div className={style.tags_input}>
            <span className={style.tag}>닉네임123(rkdkd123)<span className={style.remove_btn}/></span>
            <span className={style.tag}>닉네임123(rkdkd123)<span className={style.remove_btn}/></span>
            <span className={style.tag}>닉네임123(rkdkd123)<span className={style.remove_btn}/></span>
            <span className={style.tag}>닉네임123(rkdkd123)<span className={style.remove_btn}/></span>
            <input type="text" value="" className={style.sub_search} ref={subSearchRef}/>
          </div>
        </div>
      </div>
      <div className={style.user_search} style={{display: "block"}}>
        <ListLoading />
      </div>
      <div className={style.content}>
        <textarea name="content" maxLength={5000} placeholder="최대 5,000자 까지 작성 가능합니다."></textarea>
      </div>
    </div>
    <div className={style.bottom_btn_area}>
      <button type="button">보내기</button>
      <button type="button">취소</button>
    </div>
  </div>
}

export default NoteWrite;