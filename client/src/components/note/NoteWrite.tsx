import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ListLoading from "../common/ListLoading";
import style from "./Note.module.scss";

const NoteWrite = () => {
  const subSearchRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState("");
  const [userList, setUserList] = useState<any[]>([]);
  const [sendUserList, setSendUserList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [content, setContent] = useState("");
  const [cursorIndex, setCursorIndex] = useState(1);

  const user = useSelector((state:any) => state.auth?.user); //리덕스 유저정보

  const onClickInputSide = (e: React.MouseEvent<HTMLDivElement>) => {
    subSearchRef.current?.focus();
  }

  const onChangeSender = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSearchOpen(true);
    setSearch(e.target.value);
    try {
      setIsLoading(true);
      const res = await axios.get(`/user/api/search?keyword=${e.target.value}`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      });
      setUserList(res.data);
    }catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }

  const onClickDelete = (nickname: string) => () => {
    const temp = sendUserList.filter((item) => item!== nickname);
    setSendUserList(temp);
  }

  const onKeyPress = (e:React.KeyboardEvent<HTMLInputElement>) => {
    if(e.keyCode===32 || e.keyCode===13) {
      if(userList.length>=1) {
        setIsSearchOpen(false); 
        setSearch("");
        if(sendUserList.includes(userList[(cursorIndex - 1)%userList.length])) {
          window.confirm("이미 선택된 유저입니다.");
          return;
        }
        setSendUserList([...sendUserList, userList[(cursorIndex - 1)%userList.length]]);
      }
    } else if(e.key === "ArrowDown") {
      setCursorIndex((prev) => prev+1);
    } else if(e.key === "ArrowUp") {
      setCursorIndex((prev) => prev-1);
    }
  }
  
  useEffect (()=> {
    setCursorIndex(1);
  }, [userList]);

  const onClickSendNote = async (e:React.MouseEvent) => {
    try {
      const res = await axios.post("/api/noteWrite",{
        sender: user.nickname,
        receiverNicknames: ["nickname2"],
        content
      }
      ,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      });

      if(res.status===200) {
        window.confirm("쪽지가 성공적으로 발송되었습니다.");
        window.close();
      }
    }catch (e) {
      console.log(e);
    }
  }

  return <div className={style.note_write}>
    <h1 className={style.note_write_title}>
      쪽지 보내기
    </h1>
    <div className={style.body}>
      <div className={style.toBox}>
        <label htmlFor="sender">받는 사람</label>
        <div className={style.input_side} onClick={onClickInputSide}>
          <div className={style.tags_input}>
            <>
              {sendUserList.map((item) => 
                <span className={style.tag} >{item}<span className={style.remove_btn} onClick={onClickDelete(item)}/></span>
              )
              }
            </>
          </div>
          <input type="text" id="sender" value={search} placeholder="다중 전송은 스페이스 바로 구분해 주세요." onChange={onChangeSender} onKeyDown={onKeyPress} className={style.main_search}/>
          <div className={style.user_search} style={{display: isSearchOpen ? "block" : "none"}}>
            {
              isLoading ? <ListLoading /> : (
                <ul>
                  {
                    userList.map((item, index) => 
                      <li className={style.item} aria-selected={index === (cursorIndex - 1)%userList.length} onClick={() => {setIsSearchOpen(false);setSearch(""); if(sendUserList.includes(item)) {
                        window.confirm("이미 선택된 유저입니다.");
                        return;
                      }
                      setSendUserList([...sendUserList, item]);
                    }}>{item}</li>
                    )
                  }
                </ul>
              )
            }
          </div>
        </div>
      </div>
      <div className={style.toBox} style={{marginTop: "15px"}}>
        <div className={style.detail_title}>내용</div>
        <textarea name="content" maxLength={5000} className={style.content}placeholder="최대 5,000자 까지 작성 가능합니다." onChange={(e:React.ChangeEvent<HTMLTextAreaElement>)=> {setContent(e.target.value)}} value={content}></textarea>
      </div>
    </div>
    <div className={style.bottom_btn_area}>
      <button type="button" onClick={onClickSendNote}>보내기</button>
      <button type="button" onClick={() => window.close()}>취소</button>
    </div>
  </div>
}

export default NoteWrite;