import {useDetailContent} from "../hooks/useDetailContent.ts";

// id 값으로 특정 데이터만 가져와야함


function ContentDetail() {

  const useDC = useDetailContent();

  const test = useDC.postsDetail;

  console.log(test.data);

  return(
    <>
      <div className="min-h-dvh bg-stone-50 text-stone-900">
        <div className="mx-auto max-w-full">
          {/* 메인콘텐츠 */}
          <div className="flex flex-col items-center min-h-dvh mx-auto max-w-4xl px-6 py-6 border">

            {/* 제목 */}
            <div className="my-4">
              <p>제목</p>
              <input
                className="w-120 border p-1"
                placeholder={test.id}
              />
            </div>

            {/* 작성자 (추후 로그인 기능 개발시 삭제) */}
            <div className="mb-2">
              <p>작성자</p>
              <input
                className="w-120 border p-1"
                placeholder={test.name}
              />
            </div>

            {/* 내용 */}
            <div className="mb-4 mt-2">
              <p>내용</p>
              <textarea
                rows={3}
                className="w-120 border p-1 resize-none"
                placeholder={test.content}
              />
            </div>

            {/*------------------end--------------*/}
          </div>
        </div>
      </div>
    </>
  );


}

export default ContentDetail;
