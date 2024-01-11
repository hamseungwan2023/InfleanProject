import React from "react";
import PostList from "../components/post/PostList";
import PostWrite from "../components/post/PostWrite";
import PostWrote from "../components/post/PostWrote";

const PostWriteRoute = () => {
  return (
    <section className="postWriteRoute">
      <PostWrite />
      <div className="postWrite_warn">
        <img src="https://talk.op.gg/images/icon-adult@2x.png" alt="경고" width={24} height={24} style={{marginRight: "8px"}} />
        <strong className="postWrite_warn_text">불법촬영물등을 게재할 경우 전기통신사업법 제22조의5제1항에 따라 삭제·접속차단 등의 조치가 취해질 수 있으며 관련 법률에 따라 처벌받을 수 있습니다.</strong>
      </div>
      <div className="postWrite_btn_area">
        <button type="button" className="postWrite_btn" >취소</button>
        <button type="button" className="postWrite_btn" >작성 완료</button>
      </div>
    </section>
  )
}

export default PostWriteRoute;