import {Outlet} from "react-router-dom";
import HeaderLayout from "./HeaderLayout.tsx";
import FooterLayout from "./FooterLayout.tsx";

function MainLayout() {
  return(
    <>
      <div className="max-h-dvh w-full overflow-hidden bg-stone-50 text-stone-900">
        <HeaderLayout/>
        <Outlet/>
        <FooterLayout/>
      </div>
    </>
  );
}


export default MainLayout
