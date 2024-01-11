import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Style from "./DeleteAccount.module.scss";
import { useSelector } from "react-redux";
import { baseUrl } from "../slices/login/reducer";

const DeleteAccount = () => {
  const user = useSelector((state: any) => state.auth.user);
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);

  const [deleteBtn, setDeleteBtn] = useState<boolean>(false);
  const [goodbyePage, setGoodbyePage] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const onChange = (e: any) => {
    if (e.target.username === "username") {
      setUsername(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };
  console.log(username, password);
  const deleteUser = async (e: any) => {
    e.preventDefault();
    if (username === user.email && password === user.password) {
      try {
        await axios.delete(`${baseUrl}/api/user/delete`, {
          data: {
            username,
            password,
          },
        });
        setGoodbyePage(true);
      } catch (err) {
        console.error(err);
      }
    } else {
      alert("아이디 or 비밀번호가 일치하지 않습니다");
    }
  };
  const navigate = useNavigate();
  return (
    <div>
      {isLoggedIn === true ? (
        <div>
          {goodbyePage === false ? (
            <div className={Style.deleteAccount_wrapper}>
              <div>
                <h1>탈퇴 안내</h1>
                <div className={Style.info_wrapper}>
                  <img
                    src="https://cdn.iconscout.com/icon/free/png-256/free-check-1780563-1514439.png"
                    style={{
                      width: "20px",
                      height: "20px",
                      background: "#81ACFF",
                    }}
                  ></img>
                  <h3>
                    사용하고 계신 아이디({user.username})는 탈퇴할 경우 재사용
                    및 복구가 불가능 합니다.
                  </h3>
                </div>
                <div className={Style.warning}>
                  <span className={Style.text_red}>
                    탈퇴한 아이디는 본인과 타인 모두 재사용 및 복구가 불가
                  </span>
                  <span>하오니 신중하게 선택하시기 바랍니다.</span>
                </div>
              </div>
              <div className={Style.checkInput_wrapper}>
                <div className={Style.input_wrapper}>
                  <input
                    placeholder="아이디를 입력해주세요..."
                    name="username"
                    onChange={onChange}
                  ></input>
                </div>
                <div className={Style.input_wrapper}>
                  <input
                    placeholder="비밀번호를 입력해주세요..."
                    name="password"
                    onChange={onChange}
                  ></input>
                </div>
              </div>
              <div className={Style.button_wrapper}>
                <div className={Style.normal_btn}>
                  <button onClick={() => navigate(`/profile/${user?.id}`)}>
                    삭제 취소
                  </button>
                </div>
                {deleteBtn === false ? (
                  <div className={Style.red_btn}>
                    <button onClick={() => setDeleteBtn(true)}>계정삭제</button>
                  </div>
                ) : (
                  <div className={Style.red_btn}>
                    <button onClick={() => deleteUser}>
                      정말로 탈퇴하시겠습니까?
                    </button>
                  </div>
                )}
              </div>
              <div className={Style.last_info}>
                <img
                  src="https://cdn.iconscout.com/icon/free/png-256/free-check-1780563-1514439.png"
                  style={{
                    width: "20px",
                    height: "20px",
                    background: "#81ACFF",
                  }}
                ></img>
                <span className={Style.text_red}>
                  탈퇴 후에는
                  <span className={Style.text_default}>{user.email}</span>로
                  생성된 아이디와 데이터는 모두 복구 할 수 없습니다
                </span>
              </div>
            </div>
          ) : (
            <div>계정이 삭제 되었습니다</div>
          )}
        </div>
      ) : (
        <div>로그인이 안되면 못 보는 페이지</div>
      )}
    </div>
  );
};

export default DeleteAccount;
