import {useNavigate} from "react-router-dom";
import {useDetailContent, useDetailContentDelete, useDetailContentUpdate} from "../hooks/useDetailContent.ts";
import {type ChangeEvent, useEffect, useState} from "react";
import {client} from "../api/client.ts";

const LABEL = 'mb-1 text-xs font-semibold text-stone-500'
const FIELD = 'w-full rounded-lg border border-stone-300 bg-white px-3 py-2'
const ROW = 'mb-4 flex gap-4'
const ACTIONS = 'mt-6 flex justify-end gap-2 border-t border-stone-200 pt-4'
const BUTTON = 'rounded-lg px-4 py-2 text-sm font-medium text-white'

function ContentDetail() {

  const post = useDetailContent();

  const { deleteApi } = useDetailContentDelete();
  const navigate = useNavigate();
  const [editState, setEditState] = useState(false);
  const [editTitle, setEditTitle] = useState<string>(post.title)
  const [editName, setEditName] = useState<string>(post.title)
  const [editContent, setEditContent] = useState<string>(post.content)

  const [userId, setUserId] = useState<number>();
  const postUserId: number = post.user_id;

  const meId = async () => {
    const response = await client.get("/auth/me");
    setUserId(response.data.id);
  }
  useEffect(() => {
    meId();
  }, []);
  // console.log("내정보: ",userId);
  // console.log("글정보: ", postUserId);

  const { updateApi } = useDetailContentUpdate(editTitle, editName, editContent);

  const handleEditStateUpdate = () => {
    setEditState(!editState);
    setEditTitle(post.title);
    setEditName(post.name);
    setEditContent(post.content);
  }

  const handleDelete = async () => {
    await deleteApi();
    navigate("/main");
  }

  const handleUpdate = async () => {
    if(editTitle === '') {
      return;
    }
    if(editContent === '') {
      return;
    }

    await updateApi();
    handleEditStateUpdate();
  }

  const onChangeEditTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setEditTitle(e.target.value);
  }
  const onChangeEditContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEditContent(e.target.value);
  }

  const handleBack = () => {
    navigate("/main")
  }

  return (
    <div className="min-h-dvh bg-stone-50 text-stone-900">
      <div className="mx-auto max-w-4xl px-6 py-10">

        <div
          className="mb-4 rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-100"
          onClick={handleBack}
        >
          <button>뒤로가기</button>
        </div>

        <div className="rounded-2xl border border-stone-300 bg-white p-8 shadow-sm">

          { editState === false ?
            <>
              {/* 제목 */}
              <div className="mb-4">
                <p className={LABEL}>제목</p>
                <input
                  className={`${FIELD} text-lg font-semibold text-stone-900`}
                  value={post.title}
                  readOnly
                />
              </div>

              {/* 작성자 + 날짜 */}
              <div className={ROW}>
                <div className="flex-1">
                  <p className={LABEL}>작성자 이름</p>
                  <input
                    className={`${FIELD} text-stone-600`}
                    value={post.name}
                    readOnly
                  />
                </div>
                <div className="w-45">
                  <p className={LABEL}>날짜</p>
                  <input
                    className={`${FIELD} text-right text-stone-500`}
                    value={post.date}
                    readOnly
                  />
                </div>
              </div>

              {/* 본문 */}
              <div>
                <p className={LABEL}>본문</p>
                <textarea
                  rows={12}
                  className={`${FIELD} resize-none text-base leading-relaxed text-stone-900`}
                  readOnly
                  value={post.content}
                />
              </div>
            </> :
            <>
              {/* 제목 */}
              <div className="mb-4">
                <p className={LABEL}>제목</p>
                <input
                  className={`${FIELD} text-lg font-semibold text-stone-900`}
                  value={editTitle}
                  onChange={onChangeEditTitle}
                />
              </div>

              {/* 작성자 + 날짜 */}
              <div className={ROW}>
                <div className="flex-1">
                  <p className={LABEL}>작성자 이름</p>
                  <input
                    className={`${FIELD} text-stone-600`}
                    value={post.name}
                    readOnly
                  />
                </div>
                <div className="w-45">
                  <p className={LABEL}>날짜</p>
                  <input
                    className={`${FIELD} text-right text-stone-500`}
                    value={post.date}
                    readOnly
                  />
                </div>
              </div>

              {/* 본문 */}
              <div>
                <p className={LABEL}>본문</p>
                <textarea
                  rows={12}
                  className={`${FIELD} resize-none text-base leading-relaxed text-stone-900`}
                  value={editContent}
                  onChange={onChangeEditContent}
                />
              </div>
            </>
          }

          {/* userId, postId로 버튼 유무를 만들어야 되는데 */}
          {userId === postUserId ? editState === false ?
            <>
              {/* 버튼 */}
              <div className={ACTIONS}>
                <button
                  className={`${BUTTON} bg-red-500 hover:bg-red-600`}
                  onClick={handleDelete}
                >
                  삭제
                </button>
                <button
                  className={`${BUTTON} bg-blue-500 hover:bg-blue-600`}
                  onClick={handleEditStateUpdate}
                >
                  수정
                </button>
              </div>
            </> :
            <>
              {/* 버튼 */}
              <div className={ACTIONS}>
                <button
                  className={`${BUTTON} bg-stone-400 hover:bg-stone-500`}
                  onClick={handleEditStateUpdate}
                >
                  취소
                </button>
                <button
                  className={`${BUTTON} bg-stone-600 hover:bg-stone-700`}
                  onClick={handleUpdate}
                >
                  저장
                </button>
              </div>
            </> : false
          }

        </div>
      </div>
    </div>
  );
}

export default ContentDetail;
