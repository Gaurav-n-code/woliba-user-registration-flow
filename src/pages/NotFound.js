import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 text-center">
      <p className="text-8xl font-extrabold text-blue-600">404</p>
      <h1 className="text-2xl font-bold text-gray-800 mt-4">Page not found</h1>
      <p className="text-gray-500 mt-2 max-w-sm">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/login"
        className="mt-6 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700
          text-white font-semibold px-6 py-2.5 rounded-lg transition"
      >
        ← Back to Login
      </Link>
    </div>
  );
};

export default NotFound;
