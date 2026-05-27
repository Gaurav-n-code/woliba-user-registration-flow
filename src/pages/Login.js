import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearError } from '../redux/slices/authSlice';
import { validateLoginForm } from '../utils/validators';
import AuthLayout from '../components/layout/AuthLayout';
import Input from '../components/common/Input';
import Alert from '../components/common/Alert';

const Login = () => {
  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((s) => s.auth);

  const [form,        setForm]        = useState({ email: '', password: '' });
  const [fieldErrors, setFieldErrors] = useState({});

  /* Redirect if already authenticated */
  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard', { replace: true });
  }, [isAuthenticated, navigate]);

  /* Clear server error when user edits any field */
  useEffect(() => {
    if (error) dispatch(clearError());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.email, form.password]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (fieldErrors[name]) setFieldErrors((p) => ({ ...p, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateLoginForm(form);
    if (Object.keys(errors).length) { setFieldErrors(errors); return; }
    dispatch(loginUser(form));
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit} noValidate>
        <h2
          className="text-center font-semibold mb-6"
          style={{ color: '#1a2b4b', fontSize: '22px' }}
        >
          Sign In
        </h2>

        <Alert type="error" message={error} />

        {/* Email */}
        <div className="mb-4">
          <Input
            label="Email Address"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            error={fieldErrors.email}
            placeholder="Enter your email"
            required
            autoFocus
            autoComplete="email"
          />
        </div>

        {/* Password */}
        <div className="mb-2">
          <Input
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            error={fieldErrors.password}
            placeholder="Enter your password"
            required
            autoComplete="current-password"
            eyeColor="#E05252"
          />
        </div>

        {/* Forgot password */}
        <div className="flex justify-end mb-5">
          <Link
            to="/forgot-password"
            className="text-xs hover:underline"
            style={{ color: '#E05252' }}
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit — matches Figma grey button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md py-2.5 text-sm font-medium transition
            focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-400
            disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ backgroundColor: '#d1d5db', color: '#374151' }}
          onMouseEnter={(e) => !loading && (e.currentTarget.style.backgroundColor = '#9ca3af')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#d1d5db')}
        >
          {loading ? 'Signing in…' : 'Sign In'}
        </button>

        {/* Register link */}
        <p className="mt-5 text-center text-sm text-gray-500">
          Don&apos;t have an account?{' '}
          <Link
            to="/register"
            className="font-medium hover:underline"
            style={{ color: '#E05252' }}
          >
            Register
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Login;
