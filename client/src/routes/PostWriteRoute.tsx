import axios from "axios";
import { ContentBlock, convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostWrite from "../components/post/PostWrite";

const PostWriteRoute = () => {
  const navigate = useNavigate();
  const [convertHTML, setConvertHTML] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onClickPostWriteBtn = async () => {

    if(title.length <= 1 ) {
      window.confirm("제목은 2자 이상으로 입력해주세요.")
      return;
    }
    try {
      const res = await axios.post("/api/postWrite" , {
        title, category, content: convertHTML
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      });
      if(res.status === 200) {
        window.confirm("게시글이 등록되었습니다.");
        navigate("/");
      }
    } catch(e) {
      console.log(e);
    } 
  }

  useEffect(()=> {
    setConvertHTML(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  }, [editorState]);

  return (
    <section className="postWriteRoute">
      <PostWrite isPostCorrect={false} editorState={editorState} setEditorState={setEditorState} title={title} setTitle={setTitle} category = {category} setCategory={setCategory}/>
      <div className="postWrite_warn">
        <img src="https://talk.op.gg/images/icon-adult@2x.png" alt="경고" width={24} height={24} style={{marginRight: "8px"}} />
        <strong className="postWrite_warn_text">불법촬영물등을 게재할 경우 전기통신사업법 제22조의5제1항에 따라 삭제·접속차단 등의 조치가 취해질 수 있으며 관련 법률에 따라 처벌받을 수 있습니다.</strong>
      </div>
      <div className="postWrite_btn_area">
        <button type="button" className="postWrite_btn" >취소</button>
        <button type="button" className="postWrite_btn" onClick={onClickPostWriteBtn}>작성 완료</button>
      </div>
    </section>
  )
}

export default PostWriteRoute;