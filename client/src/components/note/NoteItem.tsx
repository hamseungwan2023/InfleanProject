import React, { useState } from "react";
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
      <td>{tabNumber === ENoteTab.send ? note.receiver : note.senderNickname}</td>
      <td>{note.content}</td>
      <td>{getDateFormat(note.sendDate)}</td>
      <td>{getDateFormat(note.receiveDate)}</td>
    </tr>
  )
}

export default NoteItem;