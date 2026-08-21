import {Outlet} from "react-router-dom";
import HeaderLayout from "./HeaderLayout.tsx";
import FooterLayout from "./FooterLayout.tsx";

function MainLayout() {
  return(
    <>
      <div className="w-full min-h-dvh bg-stone-50 text-stone-900">
        <div className="mx-auto max-w-full">
          <HeaderLayout/>
          <Outlet/>
          <FooterLayout/>
        </div>
      </div>
    </>
  );
}


export default MainLayout