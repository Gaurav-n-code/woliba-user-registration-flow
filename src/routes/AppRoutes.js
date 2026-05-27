import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Register          from '../pages/Register';
import VerificationCode  from '../pages/VerificationCode';
import LoginCredentials  from '../pages/LoginCredentials';
import WellnessInterests from '../pages/WellnessInterests';
import WellbeingPillars  from '../pages/WellbeingPillars';
import Welcome           from '../pages/Welcome';
import Dashboard         from '../pages/Dashboard';
import NotFound          from '../pages/NotFound';

const AppRoutes = () => (
  <Routes>
    {/* ── Step 1 + 2: Company verify & user details ── */}
    <Route path="/"                   element={<Register />} />

    {/* ── Step 3: OTP verification ── */}
    <Route path="/verify-code"        element={<VerificationCode />} />

    {/* ── Step 4: Login credentials & profile ── */}
    <Route path="/login-credentials"  element={<LoginCredentials />} />

    {/* ── Step 5: Wellness interests ── */}
    <Route path="/wellness-interests" element={<WellnessInterests />} />

    {/* ── Step 6 + 7: Wellbeing pillars & final registration ── */}
    <Route path="/wellbeing-pillars"  element={<WellbeingPillars />} />

    {/* ── Step 8: Welcome screen ── */}
    <Route path="/welcome"            element={<Welcome />} />

    {/* ── Post-registration ── */}
    <Route path="/dashboard"          element={<Dashboard />} />

    {/* ── Legacy redirect (old /register/details route) ── */}
    <Route path="/register/details"   element={<Navigate to="/" replace />} />

    {/* ── 404 ── */}
    <Route path="*"                   element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
