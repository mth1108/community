// import {useNavigate} from "react-router-dom";
import {useUserId} from "../hooks/useUser.ts";
import {type ChangeEvent, useState} from "react";
import {useNavigate} from "react-router-dom";


function Login() {

  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const onChangeUserName = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  }
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  // 로그인 요청, 토큰 발급, 내 정보 불러오기 훅
  const user = useUserId(username, password);

  // 리렌더링용
  const handleLogin = () => {
    user();
  }

  const handleSignup = () => {
    navigate("/signup")
  }

  return(
    <>
      <div className="max-h-dvh min-h-195 bg-stone-50 text-stone-900">
        <div className="mx-auto max-w-full">

          <div className="flex flex-col justify-center items-center pt-20">

            <p className="text-3xl pb-4">
              로그인
            </p>

            {/* 로그인 메인카드 */}
            <div>
              <div>
                <span>아이디</span>
                <input className="border mr-1" type="text" value={username} onChange={onChangeUserName}/>
              </div>

              <div>
                <span>PW</span>
                <input className="border mt-1 mr-1" type="password" value={password} onChange={onChangePassword}/>
              </div>
            </div>

            <div className="flex mt-5 gap-1">
              <button className="border p-4 active:bg-gray-400" onClick={handleSignup}>회원가입</button>
              <button className="border p-4 active:bg-gray-400" onClick={handleLogin}>로그인</button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
