import axios from "axios";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { postListData, realPostListData, TPostItem, TPostList } from "../../constants/postList";
import useInfiniteScroll, { IntersectionHandler } from "../../hooks/useInfiniteScroll";
import { sortArrByDate } from "../../utils/filter";
import PostItem from "./PostItem";
import LoadingSvg from "../../svg/Loading.svg";
import { useSelector } from "react-redux";

type TProps = {
  isPostCorrect: boolean
}

const PostList = ({isPostCorrect}:TProps) => {
  const category = useSelector((state:any) => state.category.category);

  const [pageInfo, setPageInfo] = useState({
    currentPage: 0,
    totalPage: 1
  });

  const [isLoading, setIsLoading] = useState(false);

  const [target, setTarget] = useState<Element | null >(null);
  const [postList, setPostList] = useState<TPostList>();

  const handleIntersect: IntersectionHandler = async (entry, observer) => {
    if(!isLoading) {
      setPageInfo((prev) => {
        if( prev.totalPage -1 > prev.currentPage) {
          return {
            ...prev,
            currentPage: prev.currentPage + 1
          };
        }
        return prev;
      })
    }
  };

  useInfiniteScroll(handleIntersect, target, {
    threshold: 1
  });

  const getPostList = async() => {
    setIsLoading(true);

    let api=`/api/postList/${category}?page=${pageInfo.currentPage}`;

    if(category==="전체") {
      api=`/api/postList?page=${pageInfo.currentPage}`;
    }

    const res = await axios.get(
    api, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      }
    });

    try {
      if (res.status === 200) {
        setPostList((prev) => {
          if (prev && prev.dtos?.length > 0) {
            return {
              ...res.data,
              dtos: [...prev.dtos, ...res.data.dtos]
            };
          }
          return res.data;
        });
  
        setPageInfo((prev) => ({
          ...prev,
          totalPage: res.data.totalPage
        }));
        
      }
      setIsLoading(false);
    }catch(e) {
      console.log(e);
    }
  }

  useEffect(() => {
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
  }, [pageInfo.currentPage])

  useEffect(()=> {
    setPageInfo({currentPage: 0, totalPage: 1});
    setPostList({
      dtos: [],
      currentPage: 0,
      totalPage: 1
    });

    getPostList();
  },[category]);

  return <div className="postlist" role="tabpanel">
    <ul>
      {
        postList?.dtos.map((item,index) => {
          return (
            <PostItem postItem={item} isPostCorrect={isPostCorrect} key={index} ref={postList.dtos.length - 1 === index ? setTarget : null}/>
          )
        })
      }
      {
        pageInfo.currentPage < pageInfo.totalPage-1 && isLoading && <div className="loading_wrap"><img src={LoadingSvg} alt="로딩중" /></div>
      }
    </ul>
  </div>
}

export default PostList;
