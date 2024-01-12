import Style from "./FindAccount.module.scss";
import { useState } from "react";

const FAHeader = (no: any) => {
  const [defaultStyle, setDefaultStyle] = useState<boolean>(false);

  return (
    <div className={Style.FAHeader_Wrap}>
      <button className={defaultStyle ? Style.thisText : ""}>
        아이디 변경
      </button>
      <button className={defaultStyle ? Style.thisText : ""}>
        비밀번호 변경
      </button>
    </div>
  );
};

export default FAHeader;
