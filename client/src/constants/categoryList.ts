export type TCategory = {
  category: string[];
}

export const CategoryList:TCategory[] = [
  {
    category: ["전체"]
  },
  {
    category: ["시사","IT","게임","교육","연예","영화"]
  },
  {
    category: ["모임&스터디","스터디","동호회","동네친구"]
  },
  {
    category: ["중고거래","삽니다","팝니다","후기"]
  },
  {
    category: ["게임","LOL","배그","오버워치"]
  }
]

export interface IECategory {
  [key: string]: string;
}

export const ECategory:IECategory = {
  전체: "TOTAL",
  IT: "IT",
  영화: "MOVIE",
}