import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ListLoading from "../common/ListLoading";
import style from "./Note.module.scss";

type TNoteDetail = {
  nickname: string,
  content: string
}

const NoteDetail = () => {
  const noteId = useParams().id;
  const [noteDetail, setNoteDetail] = useState<TNoteDetail>();

  const getNoteDetail = async () => {
    try{
      const res = await axios.get(`/api/noteRead/${noteId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      })

      setNoteDetail(res.data);
    } catch(e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getNoteDetail();
  }, []);

  return <div className={style.note_write} style={{padding: 0}}>
    <h1 className={style.note_write_title}>
      쪽지 읽기
    </h1>
    <div className={style.body}>
      <div className={style.toBox} style={{marginBottom: "15px"}}>
        <label htmlFor="sender">보낸 사람</label>
        <div className={style.input_side} style={{ padding: "10px", border: 0, fontWeight: 500}}>
          {noteDetail?.nickname}
        </div>
      </div>
      <div className={style.toBox}>
        <div className={style.detail_title}>내용</div>
        <div className={style.content}>
          {noteDetail?.content}
        </div>
      </div>
    </div>
    <div className={style.bottom_btn_area}>
      <button type="button" onClick={() => window.close()}>닫기</button>
    </div>
  </div>
}

export default NoteDetail;