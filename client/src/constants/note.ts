export const noteTabList = [
  "받은 쪽지",
  "보낸 쪽지",
  "보관함",
  "스팸함"
]

export type TNote = {
  id: number, //쪽지 아이디
  receiver: string, //수신자 
  senderId: number, // 발신자 id
  senderNickname: string, // 발신자 닉네임
  content: string,  //내용
  sendDate: string,  //보낸시각
  receiveDate: string,  //받은 시각
  isReceiverRead: boolean, // 수신 여부
  isSenderDelete: boolean, // 삭제여부 (발신자)
  isReceiverDelete: boolean, //삭제 여부 (수신자)
  isSpam: boolean, //스팸여부
  isDeclaration: boolean, // 신고여부
  isKeep: boolean //보관여부
}

export type TNoteList = {
  content : TNote[],
  page: number, //현재페이지
  totalPage: number //전체 페이지
}

export enum ENoteTab {
  receive = 0,
  send = 1,
  spam = 2,
  keep = 3,
}

export const tempNoteList = [
  {
    id: 1,
    receiver: "asdasd",
    sender: "asd123",
    content: "내용입니다123123123213213123",
    sendDate: "2024-01-04T18:15:30",
    receiveDate: "2024-01-04T18:15:30",
    isReceiverRead: false,
    isSenderDelete: false,
    isReceiverDelete: true,
    isSpam: false,
    isDeclaration: false,
    isKeep: false,
  },
  {
    id: 2,
    receiver: "asdasd",
    sender: "asd123",
    content: "내용입니다123123123213213123",
    sendDate: "2024-01-04T18:15:30",
    receiveDate: "2024-01-04T18:15:30",
    isReceiverRead: false,
    isSenderDelete: false,
    isReceiverDelete: true,
    isSpam: false,
    isDeclaration: false,
    isKeep: false,
  },
  {
    id: 3,
    receiver: "asdasd",
    sender: "asd123",
    content: "내용입니다123123123213213123",
    sendDate: "2024-01-04T18:15:30",
    receiveDate: "2024-01-04T18:15:30",
    isReceiverRead: true,
    isSenderDelete: false,
    isReceiverDelete: true,
    isSpam: false,
    isDeclaration: false,
    isKeep: false,
  },
  {
    id: 4,
    receiver: "asdasd",
    sender: "asd123",
    content: "내용입니다123123123213213123",
    sendDate: "2024-01-04T18:15:30",
    receiveDate: "2024-01-04T18:15:30",
    isReceiverRead: true,
    isSenderDelete: false,
    isReceiverDelete: true,
    isSpam: false,
    isDeclaration: false,
    isKeep: false,
  },
  {
    id: 5,
    receiver: "asdasd",
    sender: "asd123",
    content: "내용입니다123123123213213123",
    sendDate: "2024-01-04T18:15:30",
    receiveDate: "2024-01-04T18:15:30",
    isReceiverRead: true,
    isSenderDelete: false,
    isReceiverDelete: true,
    isSpam: false,
    isDeclaration: false,
    isKeep: false,
  },
  {
    id: 6,
    receiver: "asdasd",
    sender: "asd123",
    content: "내용입니다123123123213213123",
    sendDate: "2024-01-04T18:15:30",
    receiveDate: "2024-01-04T18:15:30",
    isReceiverRead: false,
    isSenderDelete: false,
    isReceiverDelete: true,
    isSpam: false,
    isDeclaration: false,
    isKeep: false,
  }
]

export const senderNoteList = [
  {
    id: 1,
    receiver: "asdasd",
    sender: "asd123",
    content: "내용입니다123123123213213123",
    sendDate: "2024-01-04T18:15:30",
    receiveDate: "2024-01-04T18:15:30",
    isSenderRead: false,
    isReceiverRead: true,
    isSenderDelete: false,
    isReceiverDelete: true,
    isSenderKeep: true,
    isReceiverKeep: true,
    isSpam: false,
    isDeclaration: false
  }
]