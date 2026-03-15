import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register        from './comps/Sighup';
import VerifyEmail     from './comps/Verify';
import CompleteSignup  from './comps/CompleteSignup';
import Continue        from './comps/Continue';
import Login           from './comps/Login';
import GoogleCallback  from './comps/GoogleCallback';

export default function App() {
  return (
    <Routes>
      <Route path="/register"         element={<Register />} />
      <Route path="/login"            element={<Login />} />
      <Route path="/verify-email"     element={<VerifyEmail />} />
      <Route path="/complete-profile" element={<CompleteSignup />} />
      <Route path="/cc"               element={<Continue />} />
      <Route path="/auth/callback"    element={<GoogleCallback />} />
      <Route path="/"                 element={<Login />} />
    </Routes>
  );
}