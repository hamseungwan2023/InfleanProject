import style from "./Note.module.scss";

const NoteWrite = () => {
  return <div className={style.note_write}>
    <h1 className={style.note_write_title}>
      쪽지 보내기
    </h1>
    <div className={style.body}>
      <div className={style.toBox}>
        <label htmlFor="sender">받는 사람</label>
        <input type="text" id="sender" value="" placeholder="다중 전송은 스페이스 바로 구분해 주세요." />
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