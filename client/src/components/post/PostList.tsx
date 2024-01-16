import axios from "axios";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { postListData, realPostListData, TPostItem, TPostList } from "../../constants/postList";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { sortArrByDate } from "../../utils/filter";
import PostItem from "./PostItem";

type TProps = {
  isPostCorrect: boolean
}

const PostList = ({isPostCorrect}:TProps) => {

  const [pageInfo, setPageInfo] = useState({
    page: 1,
    totalPage: 1
  });

  const [target, setTarget] = useState<Element | null >(null);
  // const [isLoading, setIsLoading] = (false);
  const [postList, setPostList] = useState<TPostList>();

  const handleIntersect = useCallback(() => {
    setPageInfo((prev) => {
      if( prev.totalPage > prev.page) {
        return {
          ...prev,
          page: prev.page + 1
        };
      }
      return prev;
    })
  }, []);

  useInfiniteScroll(handleIntersect, target, {
    threshold: 1
  });

  useEffect(() => {
    const getPostList = async() => {
      const res = await axios.get(
      `/api/postList/total?page=${pageInfo.page}`);
  
      try {
        if (res.status === 200) {
          setPostList((prev) => {
            if (prev && prev.data?.length > 0) {
              return {
                ...res.data,
                data: [...prev.data, ...res.data.data]
              };
            }
            return res.data;
          });
    
          setPageInfo((prev) => ({
            ...prev,
            totalPage: res.data.totalPage
          }));
        }
      }catch(e) {
        console.log(e);
      }
    }
    /*
    if(pageInfo.page <= realPostListData.length) {
       const res = realPostListData[pageInfo.page-1];
      
      setPostList((prev) => {
        if(prev && prev.data.length > 0) {
          return {
            ...res,
            data: [...prev.data, ...res.data]
          }
        }
        return res;
      })

      setPageInfo((prev) => ({
        ...prev,
        totalPage: res.totalPage
      }))
    }*/
    getPostList();
  }, [pageInfo.page])

  return <div className="postlist" role="tabpanel">
    <ul>
      {
        postList?.data.map((item,index) => {
          return (
            <PostItem postItem={item} isPostCorrect={isPostCorrect} key={index} ref={postList.data.length - 1 === index ? setTarget : null}/>
            /*
            [TODO] 로딩시 로딩컴포넌트 노출
            { postList.data.length - 1 === index && isLoading && <Loading />}
             */
          )
        })
      }
    </ul>
  </div>
}

export default PostList;
