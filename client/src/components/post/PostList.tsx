import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { postListData, realPostListData, TPostItem, TPostList } from "../../constants/postList";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { sortArrByDate } from "../../utils/filter";
import PostItem from "./PostItem";

const PostList = () => {
  const postList = postListData.sort(
    (a, b) => -moment(a.createdAt).diff(moment(b.createdAt))
  );

<<<<<<< HEAD
  return (
    <div className="postlist" role="tabpanel">
      <ul>
        {postList.map((item, index) => (
          <PostItem postItem={item} key={index} />
        ))}
      </ul>
    </div>
  );
};

export default PostList;
=======
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
    /* const res = axios.get<TPostList>(
      `/api/postList?type=total&page=${pageInfo.page}`;
      res.then((response) => {
        if (response.status === 200) {
          setPostList((prev) => {
            if (prev && prev.data?.length > 0) {
              return {
                ...response.data,
                data: [...prev.data, ...response.data.data]
              };
            }
            return response.data;
          });

          setPageInfo((prev) => ({
            ...prev,
            totalPage: response.data.total_pages
          }));
        }
      })
    ) */
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
    }
    
  }, [pageInfo.page])

  return <div className="postlist" role="tabpanel">
    <ul>
      {
        postList?.data.map((item,index) => {
          return (
            <PostItem postItem={item} key={index} ref={postList.data.length - 1 === index ? setTarget : null}/>
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
>>>>>>> feature/20240105kdh
