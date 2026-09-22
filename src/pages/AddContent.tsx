import {type ChangeEvent, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {client} from "../api/client.ts";

const GROUP = 'mt-4 w-120'
const LABEL = 'mb-1 text-xs font-semibold text-stone-500'
const FIELD = 'w-full rounded-lg border border-stone-300 bg-white px-3 py-2'
const BUTTON_OUTLINE = 'rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-100'
const BUTTON_PRIMARY = 'rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600'

function AddContent() {
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const [userData, setUserData] = useState<{id: number, username: string}>();

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
      console.log(response.data);
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

    // post는 (url, 본문) 순서다. name/date는 서버가 채우므로 보내도 무시된다.
    await client.post("/posts/addposts", {
      title: title,
      name: userData?.username,
      content: content,
      date: resultDate,
      userId: userData?.id
    });
    navigate('/main');
  }

  return(
    <>
      <div className="min-h-dvh bg-stone-50 text-stone-900">
        <div>

          {/* 메인콘텐츠 */}
          <div className="mx-auto flex min-h-dvh max-w-4xl flex-col items-center border border-stone-300 px-6 py-6">

            <div>
              <button className={BUTTON_OUTLINE} onClick={handleBack}>뒤로가기</button>
            </div>

            {/* 제목 */}
            <div className={GROUP}>
              <p className={LABEL}>제목</p>
              <input
                value={title}
                onChange={onChangeTitle}
                className={FIELD}
                placeholder="제목을 입력하세요"
              />
            </div>

            {/* 작성자 (추후 로그인 기능 개발시 삭제) */}
            <div className={GROUP}>
              <p className={LABEL}>작성자</p>
              <input
                value={userData?.username}
                readOnly
                className={`${FIELD} text-stone-600`}
                placeholder="작성자를 입력하세요"
              />
            </div>

            {/* 내용 */}
            <div className={GROUP}>
              <p className={LABEL}>내용</p>
              <textarea
                value={content}
                onChange={onChangeContent}
                rows={3}
                className={`${FIELD} resize-none leading-relaxed`}
                placeholder="내용을 입력하세요"
              />
            </div>

            {/* 작성 버튼 */}
            <div className="mt-6">
              <button
                className={BUTTON_PRIMARY}
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
