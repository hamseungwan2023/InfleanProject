import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ENoteTab, noteTabList, tempNoteList } from "../../constants/note";
import { getUnreadNoteCount } from "../../utils/note";
import style from "./Note.module.scss";
import NoteItem from "./NoteItem";

const NoteList = () => {
  const [tabNumber, setTabNumber] = useState<ENoteTab>(0); // 선택된 탭 번호
  const [checkScope, setCheckScope] = useState<string[]>([]); // 선택된 쪽지 id 배열
  const [unitOption, setUnitOption] = useState("15"); //페이지 당 노출 쪽지개수 select
  const [readOption, setReadOption] = useState("total"); // 전체, 읽음유무 select

  const onChangeCheck = (e:React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.checked) {
      setCheckScope([...checkScope , e.target.value]);
    }else {
      setCheckScope(checkScope.filter((item) => item!== e.target.value));
    }
  }

  const onChangeUnitOptionSelect = (e:React.ChangeEvent<HTMLSelectElement>) => {
    setUnitOption(e.target.value);
  }

  const onChangeReadOptionSelect = (e:React.ChangeEvent<HTMLSelectElement>) => {
    setReadOption(e.target.value);
  }

  const onChangeTotalCheck = (e:React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.checked) {
      const newArr: string[] = [];
      tempNoteList.forEach((item) => newArr.push(String(item.id)));
      setCheckScope(newArr);
    } else {
      setCheckScope([]);
    }
  }

  return <div className="noteList">
    <div className={style.tab_area}>
      <ul className={style.tab_list} role="tablist">
        {
          noteTabList.map((item,index) =>  <li className={style.tab_item} role="presentation" onClick={()=> {
            setTabNumber(index);
          }}>
          <button type="button" aria-selected={tabNumber === index}>{item}</button>
        </li>)
        }
      </ul>
      <button type="button" className={style.btn_note_write} onClick={() => { window.open('/noteWrite/23', '_blank', 'width=465, height=500')}}>쪽지보내기</button>
    </div>
    <div role="tabpanel">
      <div className={style.top}>
        <h4 className={style.title}>
          <h4>{noteTabList[tabNumber]}</h4>
          <p className={style.count}>{tabNumber !== ENoteTab.send && <><em>{getUnreadNoteCount(tempNoteList)}</em> / </>}<span>{tempNoteList.length}</span></p>
        </h4>
        <div className={style.set_area}>
          {tabNumber !== ENoteTab.send && <Link to="" className={style.btn_edit}>수신거부설정</Link>}
          <button type="button" className={style.btn_clear}>쪽지함비우기</button>
        </div>
      </div>
      <div className={style.note_util}>
        <div className={style.btn_list}>
          {
            tabNumber !== ENoteTab.send && <>
            <Link to="">보관</Link>
            <Link to="">수신거부</Link>
            <Link to="">스팸신고</Link>
            </>
          }
          <Link to=""><span className={style.btn_remove}>삭제</span></Link>
        </div>
        <div className={style.select_area}>
          <select className={style.select} value={unitOption} onChange={onChangeUnitOptionSelect}>
            <option value="15">15개</option>
            <option value="30">30개</option>
            <option value="50">50개</option>
          </select>
          <select className={style.select} value={readOption} onChange={onChangeReadOptionSelect}>
            <option value="total">전체쪽지</option>
            <option value="unread">안읽은 쪽지</option>
            <option value="read">읽은 쪽지</option>
          </select>
        </div>
      </div>
      <form className={style.note_content}>
        <table className={style.note_table} cellPadding={0} cellSpacing={0} border={0}>
          <colgroup>
            <col width={25} />
            <col width={150} />
            <col width="*" />
            <col width={110} />
            <col width={110} />
          </colgroup>
          <thead>
            <th className={style.check}>
              <input type="checkbox" name="check_all" onChange={onChangeTotalCheck} checked={checkScope.length === tempNoteList.length}/>
            </th>
            <th className={style.sender}>보낸 사람</th>
            <th>쪽지 내용</th>
            <th>보낸 시각</th>
            <th>읽은 시각</th>
          </thead>
          <tbody>
            {
              tempNoteList.length >= 1 ? tempNoteList.map((item, index) => <NoteItem note={item} tabNumber={tabNumber} onChangeCheck={onChangeCheck} checkScope={checkScope} key={index}/>) : <tr>
              <td className={style.none} colSpan={5}>받은 쪽지가 없습니다.</td>
            </tr>
            }
          </tbody>
        </table>
      </form>
      <div className={style.paging}>
        <em>1</em>
        <Link to="">2</Link>
      </div>
    </div>
  </div>
}

export default NoteList;