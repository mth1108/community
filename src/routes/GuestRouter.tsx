import {Navigate, Outlet} from "react-router-dom";
import {tokenStorage} from "../api/tokenStorage.ts";

function GuestRouter() {
  return tokenStorage.get() ? <Navigate to="/main" replace /> : <Outlet />
}

export default GuestRouter;