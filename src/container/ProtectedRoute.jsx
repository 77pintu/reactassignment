import React from "react";
import { Navigate } from "react-router-dom";
import css from "./Home.scss";
export default function ProtectedRoute({ children, loginStatus, loading }) {
  loading && (
    <div>
      <div className="spinner">
        <div className="bounce1"></div>
        <div className="bounce2"></div>
        <div className="bounce3"></div>
      </div>
    </div>
  );
  return !loginStatus ? <Navigate to="/" replace /> : children;
}
