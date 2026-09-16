import {useNavigate} from "react-router-dom";
import {useMainContent, useSelectId} from "../hooks/useMainContent.ts";
import {type ChangeEvent, useState} from "react";
import {tokenStorage} from "../api/tokenStorage.ts";

const GRID = 'grid grid-cols-[48px_1fr_96px_112px] items-center gap-4'

function MainContent() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState( Number(sessionStorage.getItem('page')) === 0 ? 1 : Number(sessionStorage.getItem('page')) );

  // 1. 검색시 각 페이지 별로 검색되는데 검색은 다른 페이지까지 검색되어야 함
  // -> 검색은 전체 데이터를 활용? (API 하나 더 만들어야 함)

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
    console.log(sessionStorage.getItem('page'));
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
      <div className="mx-auto max-w-full">

        {/* 검색창, 글추가 버튼 */}
        <div className="flex mx-auto max-w-4xl border border-b-0 mt-6 h-20 px-6 py-6">
          <input
            placeholder="검색하기"
            className="border w-150"
            value={search}
            onChange={onChangeSearch}
          />
          <button className="border" onClick={handleNavigateAdd}>
            글쓰기
          </button>
        </div>

        {/* 게시글 표 */}
        <div className="mx-auto max-w-4xl px-6 pb-6 border overflow-auto min-h-135">
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
          <ul className="flex gap-4 justify-center items-center">
          {pgBtn.map(b => (
            <li className="flex justify-center items-center text-xl w-8 h-8 border rounded-xl active:bg-gray-400" key={b}>
              <button className="px-2" onClick={() => handlePagination(b)} >{b}</button>
            </li>
          ))}
          </ul>
        </div>

        <div className="border max-w-20 mt-10 m-auto text-center bg-red-500 text-gray-100" onClick={handleLogout}>
          <button>로그아웃</button>
        </div>

      {/* -------------------end------------------ */}
      </div>
    </div>
  )
}

export default MainContent
