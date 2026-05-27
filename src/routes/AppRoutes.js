import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Register  from '../pages/Register';
import VerificationCode from '../pages/VerificationCode';
import Dashboard from '../pages/Dashboard';
import NotFound  from '../pages/NotFound';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Default → registration */}
      <Route path="/"          element={<Navigate to="/register" replace />} />
      <Route path="/register"  element={<Register />} />
      <Route path="/verify-code" element={<VerificationCode />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*"          element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
