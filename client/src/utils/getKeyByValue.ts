import { IECategory } from "../constants/categoryList";

export const getKeyByValue = (obj: IECategory, value: string) => {
  return Object.keys(obj).find((key)=> obj[key]===value) || "";
}