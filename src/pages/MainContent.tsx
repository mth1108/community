import {useNavigate} from "react-router-dom";
import {useMainContent, useSelectId} from "../hooks/useMainContent.ts";
import {type ChangeEvent, useState} from "react";
import {tokenStorage} from "../api/tokenStorage.ts";

const GRID = 'grid grid-cols-[48px_1fr_96px_112px] items-center gap-4'
const FIELD = 'rounded-lg border border-stone-300 bg-white px-3 py-2'
const BUTTON_OUTLINE = 'rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-100'

function MainContent() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState( Number(sessionStorage.getItem('page')) === 0 ? 1 : Number(sessionStorage.getItem('page')) );

  const { postsList } = useMainContent(page,6);
  // 검색 구현
  const compare = postsList.filter(post => post.title.toLowerCase().includes(search.toLowerCase()) || post.name.toLowerCase().includes(search.toLowerCase()))

  // 페이징 구현
  const { postsIdList } = useSelectId();
  const pgCount = Array(Math.floor(postsIdList.length % 6 === 0 ? postsIdList.length / 6 : postsIdList.length / 6 + 1));
  const pgBtn = Array.from({ length: pgCount.length }, (_, i) => {
    // 2 안사라짐 수정
    if(i / 7 === 0) {
      return 1;
    } else {
      return i + 1;
    }
  });

  const navigate = useNavigate();

  // 글작성 페이지 이동
  const handleNavigateAdd = () => {
    navigate("/main/add");
  }

  // 상세페이지 이동
  const handleNavigateDetail = (pId: number) => {
    sessionStorage.setItem('page', `${page}`);
    // console.log(sessionStorage.getItem('page'));
    navigate(`${pId}`);
  }

  // 검색
  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  // 페이징
  const handlePagination = (n: number) => {
    setPage(n);
  }

  const handleLogout = () => {
    tokenStorage.clear();
    navigate("/login");
  }

  return (
    <div className="max-h-dvh min-h-195 bg-stone-50 text-stone-900">
      <div>

        {/* 검색창, 글추가 버튼 */}
        <div className="mx-auto mt-6 flex h-20 max-w-4xl items-center gap-2 border border-b-0 border-stone-300 px-6">
          <input
            placeholder="검색하기"
            className={`${FIELD} w-150 placeholder:text-stone-400`}
            value={search}
            onChange={onChangeSearch}
          />
          <button className={BUTTON_OUTLINE} onClick={handleNavigateAdd}>
            글쓰기
          </button>
        </div>

        {/* 게시글 표 */}
        <div className="mx-auto min-h-135 max-w-4xl overflow-auto border border-stone-300 px-6 pb-6">
          <section className="mt-8" aria-label="게시글 목록">
            <div className={`${GRID} border-b border-stone-300 pb-2 text-lg font-semibold text-stone-500`}>
              <span>번호</span>
              <span>제목</span>
              <span>작성자</span>
              <span className="text-right">작성일</span>
            </div>
            <ul>
              {compare.map(p => (
                <li key={p.id} className={`${GRID} border-b border-stone-200 py-2 text-lg`}>
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

        {/* 페이지네이션 버튼 */}
        <div className="mt-8">
          <ul className="flex items-center justify-center gap-4">
          {pgBtn.map(b => (
            <li className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-300 text-xl active:bg-stone-200" key={b}>
              <button className="px-2" onClick={() => handlePagination(b)} >{b}</button>
            </li>
          ))}
          </ul>
        </div>

        <div className="m-auto mt-10 max-w-20 rounded-lg bg-red-500 py-1 text-center text-white hover:bg-red-600" onClick={handleLogout}>
          <button>로그아웃</button>
        </div>

      {/* -------------------end------------------ */}
      </div>
    </div>
  )
}

export default MainContent
