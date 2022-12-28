import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, loginStatus }) {
  return !loginStatus ? <Navigate to="/" replace /> : children;
}
