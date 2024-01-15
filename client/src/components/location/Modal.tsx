import { useState } from "react";
import Style from "./Modal.module.scss";
import DaumPostcodeEmbed from "react-daum-postcode";
const postCodeStyle = {
  width: "400px",
  height: "400px",
}; // 스타일 정의 code
const Modal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [address, setAddress] = useState<boolean>(false);

  const [sido, setSido] = useState<string>("");
  const [sigungu, setSigungu] = useState<string>("");
  const [detailAd, setDetailAd] = useState<string>("");

  console.log(address);
  const handleComplete = (data: any) => {
    setSido(data.sido);
    setSigungu(data.sigungu);
    setAddress(true);
  };
  console.log(detailAd);
  const totalAddress = `${sido} ${sigungu}`;

  return (
    <div>
      {isOpen === false ? (
        <div className={Style.adBtn_wrap}>
          <button onClick={(e) => setIsOpen(true)}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWgrFY0PxDKrLCYxJS60p-B-t9VeLLYrQWCA&usqp=CAU"
              width={"30px"}
            ></img>
            주소를 입력하세요
          </button>
        </div>
      ) : (
        <div>
          {address === false ? (
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
          ) : (
            <div>
              <div className={Style.totalAd_wrap}>
                <span>
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWgrFY0PxDKrLCYxJS60p-B-t9VeLLYrQWCA&usqp=CAU"
                    width={"25px"}
                  ></img>
                  {totalAddress}
                </span>
              </div>
              <div className={Style.detailAd_wrap}>
                <img
                  src="https://static.thenounproject.com/png/2955038-200.png"
                  width={"25px"}
                ></img>
                <input
                  onChange={(e) => setDetailAd(e.target.value)}
                  placeholder="상세주소"
                ></input>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Modal;
