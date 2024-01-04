import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  // const user = localStorage.getItem("accessToken");
  const accessToken = localStorage.getItem("accessToken") || "";
  const refreshToken = localStorage.getItem("refreshToken") || "";
  if (!accessToken && !refreshToken) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
}

// const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
//   const accessToken = localStorage.getItem("accessToken");
//   const refreshToken = localStorage.getItem("refreshToken");

//   if (!accessToken && !refreshToken) {
//     return <Navigate to="/" />;
//   }
//   return children;
// };

// export default ProtectedRoute;

// const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const accessToken = localStorage.getItem("accessToken") || "";
//   const refreshToken = localStorage.getItem("refreshToken") || "";

//   if (!accessToken && !refreshToken) {
//     return <Navigate to="/" />;
//   }
//   return <>{children}</>;
// };

// export default ProtectedRoute;
