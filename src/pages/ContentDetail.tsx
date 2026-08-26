import {useNavigate} from "react-router-dom";
import {useDetailContent, useDetailContentDelete, useDetailContentUpdate} from "../hooks/useDetailContent.ts";
import {type ChangeEvent, useState} from "react";

function ContentDetail() {

  const post = useDetailContent();

  const { deleteApi } = useDetailContentDelete();
  const navigate = useNavigate();
  const [editState, setEditState] = useState(false);
  const [editTitle, setEditTitle] = useState<string>(post.title)
  const [editName, setEditName] = useState<string>(post.name)
  const [editContent, setEditContent] = useState<string>(post.content)


  const { updateApi } = useDetailContentUpdate(editTitle, editName, editContent);

  const handleEditStateUpdate = () => {
    setEditState(!editState);
    setEditTitle(post.title);
    setEditName(post.name);
    setEditContent(post.content);
  }

  const handleDelete = async () => {
    await deleteApi();
    navigate("/");
  }

  const handleUpdate = async () => {
    if(editTitle === '') {
      return;
    }
    if(editName === '') {
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
  const onChangeEditName = (e: ChangeEvent<HTMLInputElement>) => {
    setEditName(e.target.value);
  }
  const onChangeEditContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEditContent(e.target.value);
  }

  return (
    <div className="min-h-dvh bg-stone-50 text-stone-900">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <div className="rounded-2xl border border-stone-300 bg-white p-8 shadow-sm">

          { editState === false ?
            <>
              {/* 제목 */}
              <div className="mb-4">
                <p className="mb-1 text-xs font-semibold text-stone-500">제목</p>
                <input
                  className="w-full rounded border border-stone-300 px-3 py-2 text-lg font-semibold text-stone-900"
                  value={post.title}
                  readOnly
                />
              </div>

              {/* 작성자 + 날짜 */}
              <div className="mb-4 flex gap-4">
                <div className="flex-1">
                  <p className="mb-1 text-xs font-semibold text-stone-500">작성자 이름</p>
                  <input
                    className="w-full rounded border border-stone-300 px-3 py-2 text-stone-600"
                    value={post.name}
                    readOnly
                  />
                </div>
                <div className="w-45">
                  <p className="mb-1 text-xs font-semibold text-stone-500">날짜</p>
                  <input
                    className="w-full rounded border border-stone-300 px-3 py-2 text-right text-stone-500"
                    value={post.date}
                    readOnly
                  />
                </div>
              </div>

              {/* 본문 */}
              <div>
                <p className="mb-1 text-xs font-semibold text-stone-500">본문</p>
                <textarea
                  rows={12}
                  className="w-full resize-none rounded border border-stone-300 px-3 py-2 text-base leading-relaxed text-stone-900"
                  readOnly
                  value={post.content}
                />
              </div>
            </> :
            <>
              {/* 제목 */}
              <div className="mb-4">
                <p className="mb-1 text-xs font-semibold text-stone-500">제목</p>
                <input
                  className="w-full rounded border border-stone-300 px-3 py-2 text-lg font-semibold text-stone-900"
                  value={editTitle}
                  onChange={onChangeEditTitle}
                />
              </div>

              {/* 작성자 + 날짜 */}
              <div className="mb-4 flex gap-4">
                <div className="flex-1">
                  <p className="mb-1 text-xs font-semibold text-stone-500">작성자 이름</p>
                  <input
                    className="w-full rounded border border-stone-300 px-3 py-2 text-stone-600"
                    value={editName}
                    onChange={onChangeEditName}
                  />
                </div>
                <div className="w-45">
                  <p className="mb-1 text-xs font-semibold text-stone-500">날짜</p>
                  <input
                    className="w-full rounded border border-stone-300 px-3 py-2 text-right text-stone-500"
                    value={post.date}
                    readOnly
                  />
                </div>
              </div>

              {/* 본문 */}
              <div>
                <p className="mb-1 text-xs font-semibold text-stone-500">본문</p>
                <textarea
                  rows={12}
                  className="w-full resize-none rounded border border-stone-300 px-3 py-2 text-base leading-relaxed text-stone-900"
                  value={editContent}
                  onChange={onChangeEditContent}
                />
              </div>
            </>
          }

          {editState === false ?
            <>
              {/* 버튼 */}
              <div className="mt-6 flex justify-end gap-2 border-t border-stone-200 pt-4">
                <button
                  className="rounded border border-stone-300 bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
                  onClick={handleDelete}
                >
                  삭제
                </button>
                <button
                  className="rounded border border-stone-300 bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
                  onClick={handleEditStateUpdate}
                >
                  수정
                </button>
              </div>
            </> :
            <>
              {/* 버튼 */}
              <div className="mt-6 flex justify-end gap-2 border-t border-stone-200 pt-4">
                <button
                  className="rounded border border-stone-300 bg-gray-400 px-4 py-2 text-sm font-medium text-white hover:bg-gray-500"
                  onClick={handleEditStateUpdate}
                >
                  취소
                </button>
                <button
                  className="rounded border border-stone-300 bg-gray-600 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
                  onClick={handleUpdate}
                >
                  저장
                </button>
              </div>
            </>

          }

        </div>
      </div>
    </div>
  );
}

export default ContentDetail;
