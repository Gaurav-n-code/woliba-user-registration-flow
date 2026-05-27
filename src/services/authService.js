/* ──────────────────────────────────────────
   authService.js — Auth API calls
   Base URL: https://dev.woliba.io/v1/
   ────────────────────────────────────────── */
import axiosInstance from '../api/axiosInstance';

const authService = {
  /**
   * Login
   * POST /auth/login
   */
  login: async ({ email, password }) => {
    const { data } = await axiosInstance.post('auth/login', { email, password });
    return data;
  },

  /**
   * Register new user
   * POST /auth/register
   */
  register: async (payload) => {
    const { data } = await axiosInstance.post('auth/register', payload);
    return data;
  },

  /**
   * Verify email OTP / token
   * POST /auth/verify-email
   */
  verifyEmail: async ({ token }) => {
    const { data } = await axiosInstance.post('auth/verify-email', { token });
    return data;
  },

  /**
   * Logout — invalidate server session if applicable
   * POST /auth/logout
   */
  logout: async () => {
    try {
      await axiosInstance.post('auth/logout');
    } catch (_) {
      // Best-effort; clear client state regardless
    }
  },
};

export default authService;
