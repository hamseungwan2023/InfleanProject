import React from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate() ;
  localStorage.clear();
  navigate("/");

  return (
    <div>
    Logout.
    </div>
  )
}

export default Logout;
