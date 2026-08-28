import {useNavigate} from "react-router-dom";
import {useMainContent, useSelectId} from "../hooks/useMainContent.ts";
import {type ChangeEvent, useState} from "react";

const GRID = 'grid grid-cols-[48px_1fr_96px_112px] items-center gap-4'

function MainContent() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // 페이지 위치 유지 기능 있어야함
  // 3페이지에서 글쓰기나 상세 조회후 1로 이동하는 문제 있음 -> 기본값이 1이라서 생기는 문제
  // 페이지 나눈 갯수에 따라 늘어나야 함 -> 반정도 해결


  // 1. selectPosts요청이 2번감
  // 2. 첫번째 요청은 쿼리스트링이 붙어서 가지만 2번째 요청은 안붙음
  // 3. 예상: selectPostsId가 잘못 요청되어 selectPosts로 가는듯.

  const { postsList } = useMainContent(page,7);
  // 검색 구현
  const compare = postsList.filter(post => post.title.toLowerCase().includes(search.toLowerCase()) || post.name.toLowerCase().includes(search.toLowerCase()))

  // 페이징 구현
  const { postsIdList } = useSelectId();
  const pgCount = Array(Math.floor(postsIdList.length / 7)+1).fill(0);
  const pgBtn = Array.from({ length: pgCount.length }, (_, i) => i + 1);

  console.log(pgBtn);

  const navigate = useNavigate();
  const handleNavigateAdd = () => {
    navigate("/add");
  }
  const handleNavigateDetail = (pId: number) => {
    navigate(`${pId}`);
  }
  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handlePagination = (n: number) => {
    setPage(n);
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
        <div className="mx-auto max-w-4xl px-6 pb-6 border overflow-auto min-h-155">
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

        {/*------------------------------------flex 가로정렬로 바꿀것*/}
        {pgBtn.map(b => (
          <div className="mt-4" key={b}>
            <ul className="flex gap-5 justify-center items-center">
              <li className="text-xl border">
                <button className="px-2" onClick={() => handlePagination(b)} >{b}</button>
              </li>
            </ul>
          </div>


        ))}


        {/*<div className="mt-4 ">*/}
        {/*  <ul className="flex gap-5 justify-center items-center">*/}
        {/*    <li className="text-xl border">*/}
        {/*      <button className="px-2" onClick={() => handlePagination(1)} >1</button>*/}
        {/*    </li>*/}
        {/*    <li className="text-xl border">*/}
        {/*      <button className="px-2" onClick={() => handlePagination(2)} >2</button>*/}
        {/*    </li>*/}
        {/*    <li className="text-xl border">*/}
        {/*      <button className="px-2" onClick={() => handlePagination(3)} >3</button>*/}
        {/*    </li>*/}
        {/*  </ul>*/}
        {/*</div>*/}
      {/* -------------------end------------------ */}
      </div>
    </div>
  )
}

export default MainContent
