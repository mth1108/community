import {useState, useEffect} from "react";
import {client} from "../api/client.ts";
import {tokenStorage} from "../api/tokenStorage.ts";
import {useNavigate} from "react-router-dom";

export function useUserId(username: string, password: string) {

  const [userData, setUserData] = useState<{token: string, username: string}>();

  const navigate = useNavigate();

  const login = async () => {
    try {
      // 로그인 요청 → 토큰 발급
      const res = await client.post("/auth/login", { username, password });
      // localStorage에 토큰 저장
      tokenStorage.set(res.data.token);
      // 저장된 토큰으로 내 정보 조회 (client 인터셉터가 토큰 자동첨부)
      const me = await client.get("/auth/me");
      setUserData(me.data);
      navigate('/main')
    } catch (e) {
      console.log("에러 발생:", e.message);
    }
  };

  return login;
}





