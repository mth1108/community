import {client} from "../api/client.ts";
import {useNavigate} from "react-router-dom";

export function useSignup(username: string, password: string) {

  const navigate = useNavigate();

  const signup = async () => {
    try {
      // 회원가입 정보 전달
      await client.post("/auth/signup", { username, password });
      navigate('/login');
    }
    catch (e: any) {
      console.log("에러 발생:", e.message);
    }

    // 회원가입 정보 전달
  };

  return signup;
}

