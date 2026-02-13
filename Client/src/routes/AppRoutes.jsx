import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../page/Auth/Login";
import SignUp from "../page/Auth/SignUp";
import ProtectedRoutes from "./ProtectedRoutes";
import AdminDashboard from "../page/Admin/AdminDashboard";
import ManageUsers from "../page/Admin/ManageUsers";
import UpdateUser from "../page/Admin/UpdateUser";
import MemberDashboard from "../page/Member/MemberDashboard";

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
      <Route
        path="/admin/manage-users"
        element={
          <ProtectedRoutes allowrole="admin">
            <ManageUsers />
          </ProtectedRoutes>
        }
      />

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

    </Routes>
  );
};

export default AppRoutes;
