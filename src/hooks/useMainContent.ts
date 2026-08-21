import {useEffect, useState} from "react";
import axios from "axios";

export function useMainContent() {

  const [postsList, setPostsList] = useState<any[]>([]);

  useEffect(() => {
    axios({
      url: 'http://localhost:8080/selectPosts',
      method: 'get',
    })
      .then(response => {
        // console.log("받은 데이터:", response.data, typeof response.data);
        setPostsList(response.data);
        // console.log(postsList);
      });
  }, []);

  return {postsList}

}
