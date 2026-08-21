import {useNavigate} from "react-router-dom";

function HeaderLayout() {

  const navigate = useNavigate();

  const handleNavigateMain = () => {
    navigate("/");
  }

  return(
    <header className="flex items-center border-b-2 w-full bg-gray-700 text-white border-stone-900 h-16">
      <h1 className="pl-3 text-3xl font-bold" onClick={handleNavigateMain}>Community</h1>
    </header>
  );
}

export default HeaderLayout;