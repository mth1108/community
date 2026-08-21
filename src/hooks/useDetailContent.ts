import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";

export function useDetailContent() {

  const [postsDetail, setPostsDetail] = useState<any>([]);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    axios({
      url: 'http://localhost:8080/selectPostsDetail',
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
