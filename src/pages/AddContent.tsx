import axios from "axios";
import {type ChangeEvent, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {client} from "../api/client.ts";

function AddContent() {
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const [userData, setUserData] = useState<{token: string, username: string}>();

  const today = new Date();
  const year = today.getFullYear().toString();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');
  const hour = today.getHours().toString().padStart(2, '0');
  const min = today.getMinutes().toString().padStart(2, '0');
  const seconds = today.getSeconds().toString().padStart(2, '0');

  const resultDate = year+month+day+hour+min+seconds;

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }
  const onChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }

  const handleBack = () => {
    navigate("/main")
  }

  useEffect(() => {
    const me = async () => {
      const response = await client.get("/auth/me")
      setUserData(response.data);
      // console.log(response.data);
    };

    me();
  }, []);

  const handleInsertPosts = async () => {
    if(title === '') {
      return;
    }
    if(content === '') {
      return;
    }

    await axios({
      // url: "https://glabrescent-squirtingly-diedre.ngrok-free.dev/addposts", // 통신할 웹문서
      url: "/api/posts/addposts", // 통신할 웹문서
      method: 'post', // 통신할 방식
      headers: {
        'ngrok-skip-browser-warning': 'true'
      },
      data: { // 인자로 보낼 데이터
        title: title,
        name: userData?.username,
        content: content,
        date: resultDate
      }
    });
    navigate('/main');
  }

  return(
    <>
      <div className="min-h-dvh bg-stone-50 text-stone-900">
        <div className="mx-auto max-w-full">

          {/* 메인콘텐츠 */}
          <div className="flex flex-col items-center min-h-dvh mx-auto max-w-4xl px-6 py-6 border">

            <div className="border">
              <button onClick={handleBack}>뒤로가기</button>
            </div>

            {/* 제목 */}
            <div className="my-4">
              <p>제목</p>
              <input
                value={title}
                onChange={onChangeTitle}
                className="w-120 border p-1"
                placeholder="제목을 입력하세요"
              />
            </div>

            {/* 작성자 (추후 로그인 기능 개발시 삭제) */}
            <div className="mb-2">
              <p>작성자</p>
              <input
                value={userData?.username}
                readOnly
                className="w-120 border p-1"
                placeholder="작성자를 입력하세요"
              />
            </div>

            {/* 내용 */}
            <div className="mb-4 mt-2">
              <p>내용</p>
              <textarea
                value={content}
                onChange={onChangeContent}
                rows={3}
                className="w-120 border p-1 resize-none"
                placeholder="내용을 입력하세요"
              />
            </div>

            {/* 작성 버튼 */}
            <div>
              <button
                className="border w-12 h-10 text-white bg-blue-500"
                onClick={handleInsertPosts}
              >
                작성
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );

}

export default AddContent;