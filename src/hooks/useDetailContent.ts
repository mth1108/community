import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";

type Post = {
  id: number;
  title: string;
  name: string;
  date: string;
  content: string;
}

export function useDetailContent() {

  const { id } = useParams<{ id: string }>();

  const [postsDetail, setPostsDetail] = useState<Post>(
    {
      id: 0,
      title: '',
      name: '',
      date: '',
      content: ''
    }
  );

  useEffect(() => {
    axios({
      // url: 'https://32f1-121-161-186-85.ngrok-free.app/selectPostsDetail',
      url: 'http://localhost:8080/selectPostsDetail',
      method: 'get',
      params: { id },
      headers: {
        'ngrok-skip-browser-warning': 'true'
      }
    })
      .then(response => {
        setPostsDetail(response.data);
        console.log(response.data);
      });
  }, []);

  return postsDetail;

}

export function useDetailContentDelete() {

  const { id } = useParams<{ id: string }>();

  const deleteApi= () => axios({
    url: 'http://localhost:8080/deletePostsDetail',
    method: "DELETE",
    params: { id }
  })

  // console.log(deleteApi);

  return {deleteApi}
}




export function useDetailContentUpdate(pTitle: string, pName: string, pContent: string) {

  const { id } = useParams<{ id: string }>()

  const updateApi = () => axios({
      url: 'http://localhost:8080/updatePostsDetail',
      method: "PATCH",
      data: {
        title: pTitle,
        name: pName,
        content: pContent
      },
      params: {id}
    })


  return {updateApi}

}


