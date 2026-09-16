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
    const fetchDetail = async () => {
      const response = await axios({
        // url: 'https://glabrescent-squirtingly-diedre.ngrok-free.dev/selectPostsDetail',
        url: '/api/posts/selectPostsDetail',
        method: 'get',
        params: { id },
        headers: {
          'ngrok-skip-browser-warning': 'true'
        }
      });
      setPostsDetail(response.data);
      console.log(response.data);
    };

    fetchDetail();
  }, []);

  return postsDetail;

}

export function useDetailContentDelete() {

  const { id } = useParams<{ id: string }>();

  const deleteApi = async () => {
    return await axios({
      url: '/api/posts/deletePostsDetail',
      // url: 'https://glabrescent-squirtingly-diedre.ngrok-free.dev/deletePostsDetail',
      method: "DELETE",
      params: { id },
      headers: {
        'ngrok-skip-browser-warning': 'true'
      },
    });
  }

  // console.log(deleteApi);

  return {deleteApi}
}

export function useDetailContentUpdate(pTitle: string, pName: string, pContent: string) {

  const { id } = useParams<{ id: string }>()

  const updateApi = async () => {
    return await axios({
      url: '/api/posts/updatePostsDetail',
      // url: 'https://glabrescent-squirtingly-diedre.ngrok-free.dev/updatePostsDetail',
      method: "PATCH",
      data: {
        title: pTitle,
        name: pName,
        content: pContent
      },
      params: {id},
      headers: {
        'ngrok-skip-browser-warning': 'true'
      },
    });
  }


  return {updateApi}

}


