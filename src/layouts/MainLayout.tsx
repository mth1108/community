import {Outlet} from "react-router-dom";
import HeaderLayout from "./HeaderLayout.tsx";
import FooterLayout from "./FooterLayout.tsx";

function MainLayout() {
  return(
    <>
      <div className="w-full mx-auto max-w-full max-h-dvh bg-stone-50 text-stone-900 overflow-hidden">
        <HeaderLayout/>
        <Outlet/>
        <FooterLayout/>
      </div>
    </>
  );
}


export default MainLayout