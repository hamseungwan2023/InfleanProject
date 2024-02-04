export const regionList = [
  "서울",
  "경기",
  "강원",
  "충북",
  "충남",
  "인천",
  "대전",
  "경북",
  "경남",
  "대구",
  "부산",
  "전남",
  "전북",
  "광주",
  "제주",
];

interface IRegion {
  [key: string]: string;
}

export const ERegion:IRegion = {
  서울: "SEOUL",
  경기: "GYEONGGI",
  강원: "GANGWON",
  충북: "CHUNGBUK",
  충남: "CHUNGNAM",
  인천: "INCHEON",
  대전: "DAEJEON",
  경북: "GYEONGBUK",
  경남: "GYEONGNAM",
  대구: "DAEGU",
  부산: "BUSAN",
  전남: "JEONNAM",
  전북: "JEONBUK",
  광주: "GWANGJU",
  제주: "JEJU",
}