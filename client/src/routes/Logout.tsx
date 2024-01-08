import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  localStorage.clear();
  navigate("/");

  return <div>Logout.</div>;
}

export default Logout;
