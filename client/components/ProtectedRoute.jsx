import React, {useEffect} from "react";
import { Navigate, Outlet, Route } from "react-router-dom";

const ProtectedRoute = () => {
  const isAuthenticated = JSON.parse(localStorage.getItem("isAuthenticated"));
  

  return (
    isAuthenticated ? <Outlet/> : <Navigate to='/' />
  );
}

export default ProtectedRoute;