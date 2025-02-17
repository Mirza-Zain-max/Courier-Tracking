// import React from 'react'
// import { Navigate, Outlet } from 'react-router-dom'
// import { useAuthContext } from '../../Context/Auth'

// const PrivateRoutes = () => {
//     const { isAuth } = useAuthContext()
//     return isAuth ? <Outlet /> : <Navigate to={'/auth/login'} />
// }

// export default PrivateRoutes

import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../Context/Auth";
// import { useAuthContext } from "../Context/AuthProvider";

const PrivateRoutes = () => {
    const { isAuth } = useAuthContext();
    return isAuth ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default PrivateRoutes;
