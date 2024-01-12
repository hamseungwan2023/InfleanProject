import { Link } from "react-router-dom";
import style from "./Note.module.scss";

const NoteList = () => {
  return <div className="noteList">
    <div className={style.top}>
      <h4 className={style.title}>
        <h4>받은 쪽지</h4>
        <p className={style.count}><em>0</em> / <span>0</span></p>
      </h4>
      <div className={style.set_area}>
        <Link to="" className={style.btn_edit}>수신거부설정</Link>
        <button type="button" className={style.btn_clear}>쪽지함비우기</button>
      </div>
    </div>
    <div className={style.note_util}>
      <div className={style.btn_list}>
        <Link to="">보관</Link>
        <Link to="">수신거부</Link>
        <Link to="">스팸신고</Link>
        <Link to=""><span className={style.btn_remove}>삭제</span></Link>
      </div>
      <div className={style.select_area}>
        <select className={style.select}>
          <option >15개</option>
          <option >30개</option>
          <option >50개</option>
        </select>
        <select className={style.select}>
          <option >전체쪽지</option>
          <option >안읽은 쪽지</option>
          <option >읽은 쪽지</option>
        </select>
      </div>
    </div>
    <form className={style.note_content}>
      <table className={style.note_table} cellPadding={0} cellSpacing={0} border={0}>
        <colgroup>
          <col width={25} />
          <col width="*" />
          <col width={449} />
          <col width={110} />
          <col width={110} />
        </colgroup>
        <thead>
          <th className={style.check}>
            <input type="checkbox" name="check_all" />
          </th>
          <th className={style.sender}>보낸 사람</th>
          <th>쪽지 내용</th>
          <th>보낸 시각</th>
          <th>읽은 시각</th>
        </thead>
        <tbody>
          <tr>
            <td className={style.none} colSpan={5}>받은 쪽지가 없습니다.</td>
          </tr>
        </tbody>
      </table>
    </form>
    <div className={style.paging}>
      <em>1</em>
      <Link to="">2</Link>
    </div>
  </div>
}

export default NoteList;