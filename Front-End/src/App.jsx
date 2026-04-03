import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Sighup";
import VerifyEmail from "./components/Verify";
import CompleteSignup from "./components/CompleteSignup";
import Continue from "./components/Continue";
import Login from "./components/Login";
import GoogleCallback from "./components/GoogleCallback";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import AvocatProfile from "./components/AvocatProfile";
import { Toaster } from "react-hot-toast";
import AddClient from "./pages/clients/AddClient";
import ClientsList from "./pages/clients/ClientsList";
export default function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          success: {
            style: {
              background: "#ffffff",
              color: "#1e3a5f",
              borderLeft: "4px solid #3b82f6",
              borderRadius: "12px",
              boxShadow: "0 8px 30px rgba(59, 130, 246, 0.15)",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "14px",
              padding: "14px 18px",
            },
            iconTheme: { primary: "#3b82f6", secondary: "#ffffff" },
          },
          error: {
            style: {
              background: "#ffffff",
              color: "#1e3a5f",
              borderLeft: "4px solid #f87171",
              borderRadius: "12px",
              boxShadow: "0 8px 30px rgba(248, 113, 113, 0.15)",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "14px",
              padding: "14px 18px",
            },
            iconTheme: { primary: "#f87171", secondary: "#ffffff" },
          },
        }}
      />
      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/complete-profile" element={<CompleteSignup />} />
        <Route path="/cc" element={<Continue />} />

        {/* OAuth Routes */}
        <Route path="/auth/callback" element={<GoogleCallback />} />
        <Route path="/google-callback" element={<GoogleCallback />} />

        {/* Password Management Routes */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />

        {/* Profile Routes */}
        <Route path="/AvocatProfile" element={<AvocatProfile />} />
        {/* */}
        <Route path="/clients/add" element={<AddClient />} />
        <Route path="/clients" element={<ClientsList />} />
      </Routes>
    </>
  );
}
