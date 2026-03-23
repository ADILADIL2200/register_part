import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register        from './comps/Sighup';
import VerifyEmail     from './comps/Verify';
import CompleteSignup  from './comps/CompleteSignup';
import Continue        from './comps/Continue';
import Login           from './comps/Login';
import GoogleCallback  from './comps/GoogleCallback';
import ForgotPassword from './comps/ForgotPassword';
import ResetPassword from './comps/ResetPassword';
import AvocatProfile from './comps/AvocatProfile';

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
        <Route
          path="/ForgotPassword"
          element={<ForgotPassword />}
        
        />
                <Route path='/AvocatProfile' element={<AvocatProfile />} />

        
                <Route path='/ResetPassword' element={<ResetPassword/>} />

    </Routes>
  );
}