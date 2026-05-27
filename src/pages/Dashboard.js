import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center
            text-white font-bold text-sm">
            W
          </div>
          <span className="font-bold text-gray-800 text-lg">Woliba</span>
        </div>

        <div className="flex items-center gap-3">
          {user && (
            <span className="text-sm text-gray-600 hidden sm:block">
              {user.first_name || user.name || user.email}
            </span>
          )}
          <button
            onClick={() => dispatch(logout())}
            className="text-sm font-medium text-red-500 hover:text-red-700
              border border-red-200 hover:border-red-400 px-3 py-1.5 rounded-lg transition"
          >
            Sign out
          </button>
        </div>
      </nav>

      {/* Main */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <h2 className="text-2xl font-bold text-gray-800">
          Welcome back{user?.first_name ? `, ${user.first_name}` : ''} 👋
        </h2>
        <p className="text-gray-500 mt-1">You're successfully signed in to Woliba.</p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'Active Programs', value: '3', color: 'blue' },
            { label: 'Points Earned', value: '1,240', color: 'green' },
            { label: 'Streak Days', value: '7', color: 'purple' },
          ].map((card) => (
            <div key={card.label} className="card text-center">
              <p className={`text-3xl font-extrabold text-${card.color}-600`}>{card.value}</p>
              <p className="text-sm text-gray-500 mt-1">{card.label}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
