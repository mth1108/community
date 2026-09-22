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
    <header className="flex h-18 w-full items-center justify-between border-b border-stone-900 bg-gray-700 px-6 text-white">
      <h1 className="text-3xl font-bold" onClick={handleNavigateMain}>Community</h1>
      <span className="text-lg font-bold">{userData?.username}</span>
    </header>
  );
}

export default HeaderLayout;
