import {Navigate, Outlet} from "react-router-dom";
import {tokenStorage} from "../api/tokenStorage.ts";

function MainRouter() {
  return tokenStorage.get() ? <Outlet/> : <Navigate to={"/login"} replace/>
}

export default MainRouter;