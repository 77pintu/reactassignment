import React from 'react'
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({children,loginStatus}) {
    if(!loginStatus){
        return <Navigate to="/" replace />;
    }
  return children;
}
