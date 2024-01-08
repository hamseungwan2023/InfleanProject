import React, { useEffect, useState } from "react";
import { CategoryList } from "../../constants/categoryList";
import { Editor } from 'react-draft-wysiwyg';
import { ContentState, EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import style from "./PostItem.module.scss";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

const PostWrite = () => {

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    // 글 수정 시 불러올 때 const html = '<p>수정할 글 <strong>editor</strong>😀</p>';
    const html="";
;    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const tempEditorState = EditorState.createWithContent(contentState);
      setEditorState(tempEditorState);
    }
  })

  const onEditorStateChange = (editorState: EditorState) => {
    // editorState에 값 설정
    setEditorState(editorState);
  };

  return (
    <div className={style.post_write_wrap}>
      <h2 className={style.post_write_top}>게시글 작성</h2>
      <form className={style.post_write_form}>
        <select name="category" className={style.post_write_select}>
          {CategoryList.map((item, index) => {
            if(index >=1) {
              return item.category.map((subItem, subIndex) => {
                if(subIndex >=1 ){
                  return (
                    <option className={style.option}>{subItem}</option>
                  )
                }
              })
            } else return null; 
          })}
        </select>
        <input className={style.post_write_title} type="text" name="title" placeholder="제목" value=""/>
      </form>
      <Editor 
        wrapperClassName={style.editor_wrapper}
        editorClassName={style.editor_content}
        toolbarClassName={style.editor_toolbar}
        // 툴바 설정
        toolbar={{
          // inDropdown: 해당 항목과 관련된 항목을 드롭다운으로 나타낼것인지
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: false },
        }} 
        placeholder="내용을 작성해주세요."
        // 한국어 설정
        localization={{
          locale: 'ko',
        }}
        // 초기값 설정
        editorState={editorState}
        // 에디터의 값이 변경될 때마다 onEditorStateChange 호출
        onEditorStateChange={onEditorStateChange} />
    </div>
  )
}

export default PostWrite;