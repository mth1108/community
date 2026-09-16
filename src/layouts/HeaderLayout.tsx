import {useNavigate} from "react-router-dom";
import {client} from "../api/client.ts";
import {useEffect, useState} from "react";

function HeaderLayout() {

  const [userData, setUserData] = useState<{token: string, username: string}>();

  const navigate = useNavigate();

  const handleNavigateMain = () => {
    navigate("/main");
  }

  useEffect(() => {
    const me = async () => {
      const response = await client.get("/auth/me")
      setUserData(response.data);
      // console.log(response.data);
    };

    me();
  }, []);

  return(
    <header className="flex justify-between items-center border-b-2 w-full bg-gray-700 text-white border-stone-900 h-18">
      <h1 className="pl-3 text-3xl font-bold" onClick={handleNavigateMain}>Community</h1>
      <span className="mr-5 font-bold text-lg text-white">{userData?.username}</span>
    </header>
  );
}

export default HeaderLayout;