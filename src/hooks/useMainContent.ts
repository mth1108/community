import {useEffect, useState} from "react";
import axios from "axios";

export function useMainContent() {

  const [postsList, setPostsList] = useState<any[]>([]);

  useEffect(() => {
    axios({
      url: 'https://32f1-121-161-186-85.ngrok-free.app/selectPosts',
      method: 'get',
      headers: {
        'ngrok-skip-browser-warning': 'true'
      }
    })
      .then(response => {
        // console.log("받은 데이터:", response.data, typeof response.data);
        setPostsList(response.data);
        // console.log(postsList);
      });
  }, []);

  return {postsList}

}
