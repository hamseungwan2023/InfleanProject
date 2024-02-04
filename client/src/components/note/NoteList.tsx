import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ENoteTab, noteTabList, TNote } from "../../constants/note";
import { getUnreadNoteCount } from "../../utils/note";
import style from "./Note.module.scss";
import NoteItem from "./NoteItem";

const NoteList = () => {
  const [tabNumber, setTabNumber] = useState<ENoteTab>(0); // 선택된 탭 번호
  const [checkScope, setCheckScope] = useState<number[]>([]); // 선택된 쪽지 id 배열
  const [unitOption, setUnitOption] = useState("15"); //페이지 당 노출 쪽지개수 select
  const [readOption, setReadOption] = useState("total"); // 전체, 읽음유무 select
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [totalNotes, setTotalNotes] = useState(0);
  const [notReadNoteCount, setNotReadNoteCount] = useState(0);
  const [noteList, setNoteList] = useState<TNote[]>();

  const onChangeCheck = (e:React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.checked) {
      setCheckScope([...checkScope , Number(e.target.value)]);
    }else {
      setCheckScope(checkScope.filter((item) => item!== Number(e.target.value)));
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
      const newArr: number[] = [];
      if(noteList) noteList.forEach((item) => newArr.push(item.id));
      setCheckScope(newArr);
    } else {
      setCheckScope([]);
    }
  }

  const onClickDelete = async () => {

    if(checkScope.length === 0) {
      window.confirm("삭제할 쪽지가 없습니다.")
      return;
    }

    let api ="";

    if(tabNumber === 1) {
      api=`/api/sendNoteDelete`
    }else {
      api=`/api/receiveNoteDelete`
    }

    try {
      const res = await axios.delete(api, {
        data: {
          deleteNoteIds: checkScope
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      })

      if(res.status === 200) {
        setCheckScope([]);
        getNoteList();
      }
    } catch(e) {
      console.log(e);
    }
  }

  const onClickKeep = async () => {

    if(checkScope.length === 0) {
      window.confirm("보관할 쪽지가 없습니다.")
      return;
    }

    try {
      const res = await axios.post(`/api/keepNote`, {
        noteKeeps: checkScope
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      })

      if(res.status === 200) {
        setCheckScope([]);
        getNoteList();
        window.confirm(`${checkScope.length}개의 쪽지가 보관되었습니다.`);
      }
    } catch(e) {
      console.log(e);
    }
  }

  const onClickSpam = async () => {

    if(tabNumber===3) {
      if(checkScope.length === 0) {
        window.confirm("스팸취소할 쪽지가 없습니다.")
        return;
      }
      try {
        const res = await axios.delete(`/api/spamUser`, {
          data: {
            deleteSpamIds: checkScope
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
          }
        })
  
        if(res.status === 200) {
          setCheckScope([]);
          getNoteList();
          window.confirm(`${checkScope.length}개의 쪽지가 스팸취소 처리되었습니다.`);
        }
      } catch(e) {
        console.log(e);
      }
    }else {
      if(checkScope.length === 0) {
        window.confirm("스팸신고할 쪽지가 없습니다.")
        return;
      }
      try {
        const res = await axios.post(`/api/spamNote`, {
          spamNotes: checkScope
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
          }
        })
  
        if(res.status === 200) {
          setCheckScope([]);
          getNoteList();
          window.confirm(`${checkScope.length}개의 쪽지가 스팸신고 처리되었습니다.`);
        }
      } catch(e) {
        console.log(e);
      }
    }
  }

  const onClickDeleteAll = async () => {
    if(noteList?.length === 0) {
      window.confirm("비울 쪽지가 없습니다.");
      return;
    }else {
      if(window.confirm("이 페이지의 모든 쪽지를 삭제하시겠습니까?")) {
        const deleteAllNoteIdList = noteList?.map((item) => item.id);
        let api ="";

      if(tabNumber === 1) {
        api=`/api/sendNoteDelete`
      }else {
        api=`/api/receiveNoteDelete`
      }

      try {
        let res = await axios.delete(api, {
          data: {
            deleteNoteIds: deleteAllNoteIdList
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
          }
        })

        if(res.status === 200) {
          setCheckScope([]);
          getNoteList();
        }
      } catch(e) {
        console.log(e);
      }
      }
    }
  }

  const getNoteList = async () => {
    try {
      let api = "";
      switch(tabNumber) {
        case 0: 
          api = `/api/noteReadReceivedList?page=${page-1}&unit=${unitOption}`;
          break;
        case 1:
          api = `/api/noteReadSendedList?page=${page-1}&unit=${unitOption}`;
          break;
        case 2:
          api = `/api/noteReadReceivedList?isKeep=true&page=${page-1}&unit=${unitOption}`;
          break;
        case 3:
          api = `/api/noteReadReceivedList?isSpam=true&page=${page-1}&unit=${unitOption}`;
          break;
      }

      const res = await axios.get(api, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      })
      setNoteList(res.data.content);
      setTotalPage(res.data.totalPages);
      setTotalNotes(res.data.totalElements);

      api="";
      if(tabNumber === 2) {
        api=`/api/noteNotReadReceivedList?isKeep=true`;
      }else if(tabNumber === 3) {
        api=`/api/noteNotReadReceivedList?isSpam=true`;
      }else if(tabNumber === 0) {
        api=`/api/noteNotReadReceivedList`;
      } else {
        return;
      }

      const res2 = await axios.get(api,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      }
      );

      if(res2.status === 200) {
        setNotReadNoteCount(res2.data);
      }

    } catch(e) {
      console.log(e);
    }
  }

  const clickPagination = (pageIndex: number) => (e: React.MouseEvent<HTMLSpanElement>) => {
    setPage(pageIndex);
  }

  useEffect(() => {
    setCheckScope([]);
    getNoteList();
  }, [page, unitOption, tabNumber]);

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
          <p className={style.count}>{tabNumber !== ENoteTab.send && <><em>{noteList && notReadNoteCount}</em> / </>}<span>{totalNotes}</span></p>
        </h4>
        <div className={style.set_area}>
          {tabNumber !== ENoteTab.send && <Link to="" className={style.btn_edit}>수신거부설정</Link>}
          <button type="button" className={style.btn_clear} onClick={onClickDeleteAll}>쪽지함비우기</button>
        </div>
      </div>
      <div className={style.note_util}>
        <div className={style.btn_list}>
          {
            tabNumber !== ENoteTab.send && <>
            <a role="button" onClick={onClickKeep} href="#">보관</a>
            <a role="button" href="#">수신거부</a>
            <a role="button" onClick={onClickSpam} href="#">{tabNumber === 3 ? "스팸 취소" : "스팸 신고"}</a>
            </>
          }
          <Link to=""><span className={style.btn_remove} onClick={onClickDelete}>삭제</span></Link>
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
              <input type="checkbox" name="check_all" onChange={onChangeTotalCheck} checked={checkScope.length >0 && checkScope.length === noteList?.length}/>
            </th>
            <th className={style.sender}>{tabNumber === 1 ? "받는 사람" : "보낸 사람"}</th>
            <th>쪽지 내용</th>
            <th>보낸 시각</th>
            <th>읽은 시각</th>
          </thead>
          <tbody>
            {
              noteList && noteList.length >= 1 ? noteList.map((item, index) => <NoteItem note={item} tabNumber={tabNumber} onChangeCheck={onChangeCheck} checkScope={checkScope} key={index}/>) : <tr>
              <td className={style.none} colSpan={5}>{tabNumber ===1 ? "보낸" : "받은"} 쪽지가 없습니다.</td>
            </tr>
            }
          </tbody>
        </table>
      </form>
      <div className={style.paging}>
        {
          totalPage >= 0 ? <em>1</em> : (
            Array(totalPage).fill(0).map((v,i)=>(i)).map((item) => {
              if(item + 1 === page) {
                return (
                  <em>{page}</em>
                )
              } else {
                return (
                  <span onClick={clickPagination(item+1)}>{item+1}</span>
                )
              }
            })
          )
        }
      </div>
    </div>
  </div>
}

export default NoteList;