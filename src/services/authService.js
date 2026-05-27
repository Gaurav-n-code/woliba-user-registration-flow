/* ──────────────────────────────────────────
   authService.js — Auth API calls
   Base URL: https://dev.woliba.io/v1/
   ────────────────────────────────────────── */
import axiosInstance from '../api/axiosInstance';
import { COMPANY_CREDENTIALS } from '../constants/credentials';

const authService = {
  /**
   * Step 1 — Verify company name & password
   * Local verification using static credentials.
   */
  verifyCompany: async ({ companyName, password }) => {
    if (
      companyName === COMPANY_CREDENTIALS.name &&
      password === COMPANY_CREDENTIALS.password
    ) {
      return { verified: true };
    }

    throw new Error('Invalid company name or password.');
  },

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
   * Logout — invalidate server session
   * POST /auth/logout
   */
  logout: async () => {
    try {
      await axiosInstance.post('auth/logout');
    } catch (_) {
      // Best-effort; client state is cleared regardless
    }
  },
};

export default authService;
