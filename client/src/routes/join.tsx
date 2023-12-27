import axios from 'axios';
import React, { useState } from 'react';

const Join = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try{
      await axios.post("/join" , {
        username, nickname, password, email
      }); 

    } catch(e) {
      console.log(e);
    }
    setIsLoading(false);
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (e.target.name === "username") {
      setUsername(value);
    } else if(e.target.name === "password") {
      setPassword(value);
    } else if(e.target.name === "nickname") {
      setNickname(value);
    } else {
      setEmail(value);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="username">ID</label>
      <input onChange={onChange} name="username" type="text" placeholder="ID를 입력하세요" value={username} required/>
      <label htmlFor="password">PASSWORD</label>
      <input onChange={onChange} name="password" type="password" placeholder="비밀번호를 입력하세요" value={password} required/>
      <label htmlFor="nickname">닉네임</label>
      <input onChange={onChange} name="nickname" type="text" placeholder="닉네임을 입력하세요" value={nickname}/>
      <label htmlFor="email">Email</label>
      <input onChange={onChange} name="email" type="email" placeholder="이메일을 입력하세요" value={email}/>
      <input type="submit" value={isLoading ? "제출 중 ..." : "제출하기"} />
    </form>
  )
}

export default Join;