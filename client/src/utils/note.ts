import { TNote, TNoteList } from "../constants/note";

export const getUnreadNoteCount = (noteList: TNote[]) => {
  let temp = 0;
  noteList.forEach((item) => {
    if(!item.isReceiverRead) {
      temp++;
    }
  })
  return temp;
}