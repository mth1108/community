import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";

export function useDetailContent() {

  const [postsDetail, setPostsDetail] = useState<any>([]);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    axios({
      url: 'https://32f1-121-161-186-85.ngrok-free.app/selectPostsDetail',
      method: 'get',
      params: { id }
    })
      .then(response => {
        setPostsDetail(response.data);
        console.log(response.data);
      });
  }, []);

  return {postsDetail}

}
