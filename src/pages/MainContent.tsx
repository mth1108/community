import {useNavigate} from "react-router-dom";
import {useMainContent} from "../hooks/useMainContent.ts";

const GRID = 'grid grid-cols-[48px_1fr_96px_112px] items-center gap-4'

function MainContent() {

  const useMC = useMainContent();

  const postData = useMC.postsList;
  console.log(postData);

  const navigate = useNavigate();

  const handleNavigateAdd = () => {
    navigate("/add");
  }

  const handleNavigateDetail = (pId: number) => {
    navigate(`${pId}`);
  }

  return (
    <div className="min-h-dvh bg-stone-50 text-stone-900">
      <div className="mx-auto max-w-full">

        {/* 검색창, 글추가 버튼 */}
        <div className="flex mx-auto max-w-4xl border mt-6 h-20 px-6 py-6">
          <input
            placeholder="검색하기"
            className="border"
          />
          <button className="border" onClick={handleNavigateAdd}>
            글쓰기
          </button>
        </div>

        {/* 게시글 표 */}
        <div className="mx-auto max-w-4xl px-6 py-6 border">
          <section className="mt-8" aria-label="게시글 목록">
            <div className={`${GRID} border-b border-stone-300 pb-2 text-xm font-semibold text-stone-500`}>
              <span>번호</span>
              <span>제목</span>
              <span>작성자</span>
              <span className="text-right">작성일</span>
            </div>
            <ul>
              {postData.map(p => (
                <li key={p.id} className={`${GRID} border-b border-stone-200 py-3 text-base`}>
                  <span className="text-stone-400">{p.id}</span>
                  <span
                    className="truncate font-medium"
                    onClick={() => handleNavigateDetail(p.id)}
                  >{p.title}</span>
                  <span className="text-stone-600">{p.name}</span>
                  <span className="text-right text-stone-500">{p.date}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}

export default MainContent
