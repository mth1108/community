import {useEffect, useState} from "react";
import axios from "axios";

type Post = {
  id: number;
  title: string;
  name: string;
  date: string;
}

export function useMainContent(page: number, size: number) {

  const [postsList, setPostsList] = useState<Post[]>([]);

  useEffect(() => {
    axios({
      url: 'https://glabrescent-squirtingly-diedre.ngrok-free.dev/selectPosts',
      // 나중에 페이지 및 사이즈는 인자로 받을 예정(아마)
      // url: 'http://localhost:8080/selectPosts',
      method: 'get',
      headers: {
        'ngrok-skip-browser-warning': 'true'
      },
      params: {page, size}
    })
      .then(response => {
        // console.log("받은 데이터:", response.data, typeof response.data);
        setPostsList(response.data);
        // console.log(postsList);
      });
  }, [page]);

  return {postsList}

}

type id = {
  id: number
}

export function useSelectId() {

  const [postsIdList, setPostsIdList] = useState<id[]>([]);

  useEffect(() => {
    axios({
      url: 'https://glabrescent-squirtingly-diedre.ngrok-free.dev/selectPostsId',
      // 나중에 페이지 및 사이즈는 인자로 받을 예정(아마)
      // url: 'http://localhost:8080/selectPostsId',
      method: 'get',
      headers: {
        'ngrok-skip-browser-warning': 'true'
      },
    })
      .then(response => {
        // console.log("받은 데이터:", response.data, typeof response.data);
        setPostsIdList(response.data);
        // console.log(postsList);
      });
  }, []);

  return {postsIdList}

}
