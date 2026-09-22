import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {client} from "../api/client.ts";

type Post = {
  id: number;
  title: string;
  name: string;
  date: string;
  content: string;
  user_id: number;
}

export function useDetailContent() {

  const { id } = useParams<{ id: string }>();

  const [postsDetail, setPostsDetail] = useState<Post>(
    {
      id: 0,
      title: '',
      name: '',
      date: '',
      content: '',
      user_id: 0
    }
  );

  useEffect(() => {
    const fetchDetail = async () => {
      const response = await client.get("/posts/selectPostsDetail", {params: {id}});
      setPostsDetail(response.data);
    };

    fetchDetail();
  }, []);

  return postsDetail;

}

export function useDetailContentDelete() {

  const { id } = useParams<{ id: string }>();

  const deleteApi = async () => {
    // delete는 본문이 없으므로 get과 같이 두 번째 인자가 config다
    return await client.delete("/posts/deletePostsDetail", {params: {id}});
  }

  return {deleteApi}
}

export function useDetailContentUpdate(pTitle: string, pName: string, pContent: string) {

  const { id } = useParams<{ id: string }>()

  const updateApi = async () => {
    // patch는 (url, 본문, config) 순서라 쿼리스트링은 세 번째 인자로 들어간다.
    return await client.patch(
      "/posts/updatePostsDetail",
      {
        title: pTitle,
        name: pName,
        content: pContent
      },
      {params: {id}}
    );
  }

  return {updateApi}

}
