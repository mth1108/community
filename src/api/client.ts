import axios from "axios";
import {tokenStorage} from "./tokenStorage.ts";

// □ 모든 요청에 토큰 자동첨부

export const client = axios.create({baseURL: '/api', headers: {'Content-Type': 'application/json'}});

// 나가기 직전 토큰이 있다면 헤더에 추가
client.interceptors.request.use(config => {
  const token = tokenStorage.get();
  if(token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
})

// 401일시 토큰 폐기 | /login으로 이동
// 인터셉터는 컴포넌트가 아니라서 useNavigate()를 호출할 수 없다(Invalid hook call).
// 대신 window.location으로 이동시킨다.
client.interceptors.response.use(
  res => res,
  err => {
    // 서버가 꺼져 있으면 err.response 자체가 없으므로 옵셔널 체이닝이 필요하다
    if(err.response?.status === 401) {
      tokenStorage.clear();
      // 이미 로그인 화면이면 다시 이동시키지 않는다 (무한 새로고침 방지)
      if(window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(err);
  }
)
