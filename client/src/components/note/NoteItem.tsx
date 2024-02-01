import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ENoteTab, TNote, TNoteList } from "../../constants/note";
import getDateFormat from "../../utils/getDateFormat";
import style from "./Note.module.scss";

export interface TProps {
  note: TNote
  tabNumber: ENoteTab,
  onChangeCheck: (e:React.ChangeEvent<HTMLInputElement>) => void,
  checkScope: number[]
}

const NoteItem = ({ note, tabNumber, onChangeCheck, checkScope } : TProps) => {
  return (
    <tr className={note.isReceiverRead ? style.is_read : "" }>
      <td className={style.check}>
        <input type="checkbox" name="check_each" onChange={onChangeCheck} checked={checkScope.includes(note.id)} value={String(note.id)}/>
      </td>
      <td>{tabNumber === ENoteTab.send ? note.receiverNickname : note.senderNickname}</td>
      <td onClick={() => { window.open(`/noteDetail/${note.id}`, '_blank', 'width=465, height=500')}} style={{ cursor: "pointer"}}>{note.content}</td>
      <td>{getDateFormat(note.sendDate)}</td>
      <td>{getDateFormat(note.receiveDate)}</td>
    </tr>
  )
}

export default NoteItem;