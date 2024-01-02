import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = localStorage.getItem("accessToken");

  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
}
