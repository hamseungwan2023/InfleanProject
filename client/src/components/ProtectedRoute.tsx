import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
  console.log(isLoggedIn);

  return <>{children}</>;
}
