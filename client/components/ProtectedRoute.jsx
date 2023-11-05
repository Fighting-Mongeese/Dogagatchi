import React, {useEffect} from "react";
import { Navigate, Outlet, Route } from "react-router-dom";

const ProtectedRoute = () => {
  const isAuthenticated = JSON.parse(localStorage.getItem("isAuthenticated"));
  console.log("this", isAuthenticated);

  useEffect(() => {
    console.log(typeof isAuthenticated)
  }, [])

  return (
    isAuthenticated ? <Outlet/> : <Navigate to='/' />
  );
}

export default ProtectedRoute;