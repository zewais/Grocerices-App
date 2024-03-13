import { Outlet, Navigate } from "react-router-dom";

import Cookies from "universal-cookie";

export default function PrivateRoutes() {
  const cookies = new Cookies();
  const cookieToken = cookies.get("jwt_authorization");
  {
    console.log(cookieToken);
    console.log(Boolean(cookieToken));
  }
  return cookieToken ? <Outlet /> : <Navigate to="/not-authorized" />;
}
