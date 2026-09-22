// import {useNavigate} from "react-router-dom";
// import {useUserId} from "../hooks/useUser.ts";
import {type ChangeEvent, useState} from "react";
import {useSignup} from "../hooks/useSignup.ts";

const ROW = 'flex items-center gap-2'
const LABEL = 'w-16 text-stone-600'
const FIELD = 'rounded-lg border border-stone-300 bg-white px-3 py-2'
const BUTTON_OUTLINE = 'rounded-lg border border-stone-300 bg-white p-4 font-medium text-stone-700 hover:bg-stone-100 active:bg-stone-200'

function Signup() {

  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onChangeUserName = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  }
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  const signup = useSignup(username, password);

  const handleSignup = () => {
    signup();
  }

  return(
    <>
      <div className="max-h-dvh min-h-195 bg-stone-50 text-stone-900">
        <div>

          <div className="flex flex-col items-center justify-center pt-20">

            <p className="pb-4 text-3xl">
              회원가입
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

            <button className={`${BUTTON_OUTLINE} mt-5`} onClick={handleSignup}>회원가입</button>

          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
