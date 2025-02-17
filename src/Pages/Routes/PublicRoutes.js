// import React from 'react'
// import { Navigate, Outlet } from 'react-router-dom'
// import { useAuthContext } from '../../Context/Auth'

// const PublicRoutes = () => {
//   const { isAuth } = useAuthContext()
//   return isAuth ? <Navigate to={'/add'}/> : <Outlet/>
// }
// export default PublicRoutes


import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../Context/Auth";
// import { useAuthContext } from "../Context/AuthProvider";

const PublicRoutes = () => {
    const { isAuth } = useAuthContext();
    return !isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default PublicRoutes;
