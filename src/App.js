import "./App.scss";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./container/Home";
import Edit from "./container/Edit";
import CreateLogin from "./container/CreateLogin";
import Login from "./container/Login";
import NotFoundPage from "./container/NotFound";
import ProtectedRoute from "./container/ProtectedRoute";
import Reset from "./container/Reset";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./auth/firebase";
import UserDetails from "./container/UserDetails";
function App() {
  const [user, setUser] = React.useState(true);
  const [usersDetailsStatus, loading, error] = useAuthState(auth);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute
                loginStatus={usersDetailsStatus}
                loading={loading}
              >
                <Home />
              </ProtectedRoute>
            }
          >
            <Route path="edit/:idUser" element={<Edit />} />
          </Route>
          <Route
            path="profile/:idDetails"
            element={
              <ProtectedRoute
                loginStatus={usersDetailsStatus}
                loading={loading}
              >
                <UserDetails />
              </ProtectedRoute>
            }
          />
          <Route path="/create" element={<CreateLogin />} />
          <Route path="/reset" element={<Reset />} />
          <Route
            path="*"
            element={
              <ProtectedRoute
                loginStatus={usersDetailsStatus}
                loading={loading}
              >
                <NotFoundPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
