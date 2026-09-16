// import {useNavigate} from "react-router-dom";
// import {useUserId} from "../hooks/useUser.ts";
import {type ChangeEvent, useState} from "react";
import {useSignup} from "../hooks/useSignup.ts";

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
        <div className="mx-auto max-w-full">

          <div className="flex flex-col justify-center items-center pt-20">

            <p className="text-3xl pb-4">
              회원가입
            </p>

            {/* 로그인 메인카드 */}
            <div>
              <div>
                <span>아이디</span>
                <input className="border" type="text" value={username} onChange={onChangeUserName}/>
              </div>

              <div>
                <span>PW</span>
                <input className="border" type="password" value={password} onChange={onChangePassword}/>
              </div>
            </div>

            <button className="border p-4 active:bg-gray-400" onClick={handleSignup}>회원가입</button>

          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
