// import {useNavigate} from "react-router-dom";
import {useUserId} from "../hooks/useUser.ts";
import {type ChangeEvent, useState} from "react";
import {useNavigate} from "react-router-dom";

const ROW = 'flex items-center gap-2'
const LABEL = 'w-16 text-stone-600'
const FIELD = 'rounded-lg border border-stone-300 bg-white px-3 py-2'
const BUTTON_OUTLINE = 'rounded-lg border border-stone-300 bg-white p-4 font-medium text-stone-700 hover:bg-stone-100 active:bg-stone-200'

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
        <div>

          <div className="flex flex-col items-center justify-center pt-20">

            <p className="pb-4 text-3xl">
              로그인
            </p>

            {/* 로그인 메인카드 */}
            <div className="flex flex-col gap-2">
              <div className={ROW}>
                <span className={LABEL}>아이디</span>
                <input className={FIELD} type="text" value={username} onChange={onChangeUserName}/>
              </div>

              <div className={ROW}>
                <span className={LABEL}>PW</span>
                <input className={FIELD} type="password" value={password} onChange={onChangePassword}/>
              </div>
            </div>

            <div className="mt-5 flex gap-2">
              <button className={BUTTON_OUTLINE} onClick={handleSignup}>회원가입</button>
              <button className={BUTTON_OUTLINE} onClick={handleLogin}>로그인</button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
