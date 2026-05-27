/* ──────────────────────────────────────────────────────────────────
   authService.js — All API calls to the mock backend
   Base URL: http://localhost:4000/v1/ (set in axiosInstance.js)
   ────────────────────────────────────────────────────────────────── */
import axiosInstance from '../api/axiosInstance';

const authService = {
  /* ── Step 1 ─────────────────────────────────────────────────────
     POST /verify-by-company-name-and-password
     Returns: { status: 'success', data: [{ id, company_name, ... }] }
  ──────────────────────────────────────────────────────────────── */
  verifyCompany: async ({ company_name, password }) => {
    const { data } = await axiosInstance.post(
      'verify-by-company-name-and-password',
      { company_name, password },
    );
    return data;
  },

  /* ── Step 2 ─────────────────────────────────────────────────────
     POST /save-user-details-and-send-otp
     Returns: { status: 'success', data: { message, token } }
  ──────────────────────────────────────────────────────────────── */
  saveUserDetails: async ({ company_id, mail, fname, lname }) => {
    const { data } = await axiosInstance.post(
      'save-user-details-and-send-otp',
      { company_id, mail, fname, lname },
    );
    return data;
  },

  /* ── Step 3 — Verify OTP ─────────────────────────────────────────
     POST /verify-otp-for-user-registration
     Returns: { status: true, data: 'OTP verified successfully!' }
  ──────────────────────────────────────────────────────────────── */
  verifyOtp: async ({ otp, token }) => {
    const { data } = await axiosInstance.post(
      'verify-otp-for-user-registration',
      { otp, token },
    );
    return data;
  },

  /* ── Step 3 — Resend OTP ─────────────────────────────────────────
     POST /send-otp-for-user-registration
     Returns: { status: true, data: { message, token } }
  ──────────────────────────────────────────────────────────────── */
  resendOtp: async ({ email }) => {
    const { data } = await axiosInstance.post(
      'send-otp-for-user-registration',
      { email },
    );
    return data;
  },

  /* ── Step 5 — Wellness Interests ─────────────────────────────────
     GET /viewWellnessInterest
     Returns: { status: true, data: [{ id, name, interest_type, ... }] }
  ──────────────────────────────────────────────────────────────── */
  getWellnessInterests: async () => {
    const { data } = await axiosInstance.get('viewWellnessInterest');
    return data;
  },

  /* ── Step 6 — Wellbeing Pillars ──────────────────────────────────
     GET /get-wellbeing-pillars/1
     Returns: { status: true, data: [{ id, pillar_title, description }] }
  ──────────────────────────────────────────────────────────────── */
  getWellbeingPillars: async (languageId = 1) => {
    const { data } = await axiosInstance.get(`get-wellbeing-pillars/${languageId}`);
    return data;
  },

  /* ── Step 7 — Complete Registration ─────────────────────────────
     POST /user-registration
     Returns: { status: 'success', data: { token, user: { uid, fname, ... } } }
  ──────────────────────────────────────────────────────────────── */
  completeRegistration: async (payload) => {
    const { data } = await axiosInstance.post('user-registration', payload);
    return data;
  },
};

export default authService;
