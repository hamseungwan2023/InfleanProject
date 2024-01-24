import axios from "axios";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { TPostList } from "../../constants/postList";
import useInfiniteScroll, { IntersectionHandler } from "../../hooks/useInfiniteScroll";
import PostItem from "./PostItem";
import LoadingSvg from "../../svg/Loading.svg";
import { useSelector } from "react-redux";
import PostListNoResult from "./PostListNoResult";

type TProps = {
  isPostCorrect: boolean
}

const PostList = ({isPostCorrect}:TProps) => {
  const category = useSelector((state:any) => state.category.category);
  const location = useSelector((state:any) => state.location.location);
  const search = useSelector((state:any) => state.search.search);
  const searchCategory = useSelector((state:any) => state.search.searchCategory);
  const orderBy = useSelector((state:any) => state.orderBy.orderBy);

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

    let api="";

    if(search==="") {
      if(category==="전체") api=`/api/postList?location=${location}&page=${pageInfo.currentPage}&orderBy=${orderBy}`;
      else {
        api=`/api/postList?category=${category}&location=${location}&page=${pageInfo.currentPage}&orderBy=${orderBy}`;
      }
    }else {
      let dropDownOption = "";

      switch(searchCategory) {
        case 0: dropDownOption="title"; break;
        case 1: dropDownOption="content"; break;
        default: dropDownOption="titleContent";
      }

      if(category==="전체") api=`/api/postList?location=${location}&page=${pageInfo.currentPage}&${dropDownOption}=${search}&orderBy=createdDate`;
      else {
        api=`/api/postList?category=${category}&location=${location}&page=${pageInfo.currentPage}&${dropDownOption}=${search}&orderBy=createdDate`;
      }
    }

    

    const res = await axios.get(
    api);

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

  useEffect(()=> {
    setPageInfo({currentPage: 0, totalPage: 1});
    setPostList({
      dtos: [],
      currentPage: 0,
      totalPage: 1
    });

    getPostList();
  },[category, location, search, orderBy, pageInfo.currentPage]);

  return <div className="postlist" role="tabpanel">
    {
      postList && postList.dtos.length > 0 ? 
      <ul>
      {
        postList.dtos.map((item,index) => {
          return (
            <PostItem postItem={item} isPostCorrect={isPostCorrect} key={index} ref={postList.dtos.length - 1 === index ? setTarget : null}/>
          )
        })
      }
      {
        pageInfo.currentPage < pageInfo.totalPage-1 && isLoading && <div className="loading_wrap"><img src={LoadingSvg} alt="로딩중" /></div>
      }
    </ul> :
    <PostListNoResult />
    }
  </div>
}

export default PostList;
