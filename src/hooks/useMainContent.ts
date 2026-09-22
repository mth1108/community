import {useEffect, useState} from "react";
import {client} from "../api/client.ts";

type Post = {
  id: number;
  title: string;
  name: string;
  date: string;
}

export function useMainContent(page: number, size: number) {

  const [postsList, setPostsList] = useState<Post[]>([]);

  // 이건 처음에 로딩 됐을때 콘텐츠 불러와야해서 useEffect 사용하는게 맞는듯
  useEffect(() => {
    const fetchPosts = async () => {
      // client를 쓰면 요청 인터셉터가 Authorization 헤더를 자동으로 붙여준다.
      // baseURL이 '/api' 라서 경로에서 '/api' 를 뺀다.
      // get의 두 번째 인자는 config이므로 쿼리스트링은 params 안에 넣어야 한다.
      const response = await client.get("/posts/selectPosts", {params: {page, size}});
      setPostsList(response.data);
    };
    fetchPosts();
  }, [page]);

  return {postsList}

}

type id = {
  id: number
}

export function useSelectId() {

  const [postsIdList, setPostsIdList] = useState<id[]>([]);

  useEffect(() => {
    const fetchPostsId = async () => {
      const response = await client.get("/posts/selectPostsId");
      setPostsIdList(response.data);
    };

    fetchPostsId();
  }, []);

  return {postsIdList}

}
