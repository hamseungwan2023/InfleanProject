import React, { useState } from "react";
import { ENoteTab, TNoteList } from "../../constants/note";
import getDateFormat from "../../utils/getDateFormat";
import style from "./Note.module.scss";

export interface TProps {
  note: TNoteList
  tabNumber: ENoteTab,
  onChangeCheck: (e:React.ChangeEvent<HTMLInputElement>) => void,
  checkScope: string[]
}

const NoteItem = ({ note, tabNumber, onChangeCheck, checkScope } : TProps) => {
  return (
    <tr className={note.isReceiverRead ? style.is_read : "" }>
      <td className={style.check}>
        <input type="checkbox" name="check_each" onChange={onChangeCheck} checked={checkScope.includes(String(note.id))} value={String(note.id)}/>
      </td>
      <td>{tabNumber === ENoteTab.send ? note.receiver : note.sender}</td>
      <td>{note.content}</td>
      <td>{getDateFormat(note.sendDate)}</td>
      <td>{getDateFormat(note.receiveDate)}</td>
    </tr>
  )
}

export default NoteItem;