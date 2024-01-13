import { TNoteList } from "../constants/note";

export const getUnreadNoteCount = (noteList: TNoteList[]) => {
  let temp = 0;
  noteList.forEach((item) => {
    if(!item.isReceiverRead) {
      temp++;
    }
  })
  return temp;
}