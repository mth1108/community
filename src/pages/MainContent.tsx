import {useNavigate} from "react-router-dom";
// import axios from "axios";
// import {useEffect, useState} from "react";
import {useMainContent} from "../hooks/useMainContent.ts";

// const POSTS = [
//   { id: 5, title: '게시판 프로젝트를 이제 막 시작했습니다', name: '김하늘', date: '2026.08.13' },
//   { id: 4, title: 'React와 스프링부트 연동, 이렇게 했어요', name: '이준호', date: '2026.08.12' },
//   { id: 3, title: 'MySQL 스키마 설계하며 배운 점 정리', name: '박서연', date: '2026.08.11' },
//   { id: 2, title: '오늘 배운 것 기록 — 첫 TIL', name: '정민우', date: '2026.08.10' },
//   { id: 1, title: '다들 반가워요, 자유롭게 인사 나눠요', name: '최유진', date: '2026.08.09' },
// ]

const GRID = 'grid grid-cols-[48px_1fr_96px_112px] items-center gap-4'

function MainContent() {

  // const [postsList, setPostsList] = useState([]);

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

  // useEffect(() => {
  //   axios({
  //     url: 'http://localhost:8080/selectPosts',
  //     method: 'get',
  //   })
  //     .then(response => {
  //       // console.log("받은 데이터:", response.data, typeof response.data);
  //       setPostsList(response.data);
  //       // console.log(postsList);
  //     });
  // }, []);



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
                  <span className="text-right text-stone-500">{p.data}</span>
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
