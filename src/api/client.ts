import axios from "axios";
import {tokenStorage} from "./tokenStorage.ts";
import {useNavigate} from "react-router-dom";

// □ 모든 요청에 토큰 자동첨부

export const client = axios.create({baseURL: '/api', headers: {'Content-Type': 'application/json'}});

// console.log("client type: " + typeof client);

// 나가기 직전 토큰이 있다면 헤더에 추가
client.interceptors.request.use(config => {
  const token = tokenStorage.get();
  if(token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
})

// 401일시 토큰 폐기 | /login으로 이동
client.interceptors.response.use(
  res => res,
  err => {
    const navigate = useNavigate();
    if(err.response.status === 401) {
      tokenStorage.clear();
      navigate("/login");
    }
    return Promise.reject(err);
  }
)


