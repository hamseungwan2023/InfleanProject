import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const isLoggedIn = localStorage.getItem("refreshToken");
  const user = useSelector((state: any) => state.auth.user);
  const navigate = useNavigate();

  return (
    isLoggedIn && user ? <>{children}</>:<Navigate to="/"></Navigate>
  )
}
