import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../page/Auth/Login";
import SignUp from "../page/Auth/SignUp";
import ProtectedRoutes from "./ProtectedRoutes";
import AdminDashboard from "../page/Admin/AdminDashboard";
import UpdateUser from "../page/Admin/UpdateUser";
import MemberDashboard from "../page/Member/MemberDashboard";
import NotFound from "../page/Member/NotFound";
const AppRoutes = () => {
  return (
    <Routes>

      {/* Default: Go to Signup first */}
      <Route path="/" element={<Navigate to="/signup" />} />

      {/* Login / SignUp */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Admin Dashboard */}
      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoutes allowrole="admin">
            <AdminDashboard />
          </ProtectedRoutes>
        }
      />

      {/* Admin Manage Users */}
     

      {/* Admin Update User */}
      <Route
        path="/admin/update-user/:id"
        element={
          <ProtectedRoutes allowrole="admin">
            <UpdateUser />
          </ProtectedRoutes>
        }
      />

      {/* Member Dashboard */}
      <Route
        path="/member-dashboard"
        element={
          <ProtectedRoutes allowrole="member">
            <MemberDashboard />
          </ProtectedRoutes>
        }
      />
 <Route path="*" element={<NotFound/>}/>
    </Routes>
  );
};

export default AppRoutes;
