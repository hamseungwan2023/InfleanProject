import { useState } from "react";
import Style from "./Modal.module.scss";
import DaumPostcodeEmbed from "react-daum-postcode";
const postCodeStyle = {
  width: "400px",
  height: "400px",
}; // 스타일 정의 code

type Props = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  getAddress: (e: string) => void;
};

const Modal: React.FC<Props> = ({ setIsOpen, getAddress }) => {
  const handleComplete = (data: any) => {
    getAddress(data.sido);
    setIsOpen(false);
  };
  return (
    <div>
      <div>
        <div>
          <div className={Style.modal_wrap}>
            <header className={Style.header_wrap}>
              <h2>주소 입력</h2>
            </header>
            <div className={Style.location_wrap}>
              <DaumPostcodeEmbed
                style={postCodeStyle}
                onComplete={handleComplete}
              />
            </div>
            <footer className={Style.footer_wrap}>
              <button onClick={(e) => setIsOpen(false)}>취소</button>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
