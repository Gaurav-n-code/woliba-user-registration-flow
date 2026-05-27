import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../services/authService';
import { getErrorMessage } from '../../utils/helpers';

/* ════════════════════════════════════════════
   ASYNC THUNKS
════════════════════════════════════════════ */

/**
 * Step 1 — Verify company name & password
 * POST /verify-by-company-name-and-password
 */
export const verifyCompany = createAsyncThunk(
  'auth/verifyCompany',
  async (payload, { rejectWithValue }) => {
    try {
      const data = await authService.verifyCompany(payload);
      console.log('data', data);
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

/**
 * Login
 * POST /auth/login
 */
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await authService.login(credentials);
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

/**
 * Register
 * POST /auth/register
 */
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (payload, { rejectWithValue }) => {
    try {
      const data = await authService.register(payload);
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

/* ════════════════════════════════════════════
   INITIAL STATE
════════════════════════════════════════════ */
const initialState = {
  /* Auth session */
  user:            null,
  token:           localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),

  /* Shared async state */
  loading: false,
  error:   null,

  /* Registration-specific */
  verifyLoading:       false,   // Step-1 verify spinner
  verifyError:         null,    // Step-1 verify API error
  registrationSuccess: false,   // Step-2 register done
};

/* ════════════════════════════════════════════
   SLICE
════════════════════════════════════════════ */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user            = null;
      state.token           = null;
      state.isAuthenticated = false;
      state.error           = null;
      localStorage.removeItem('token');
    },
    clearError(state) {
      state.error       = null;
      state.verifyError = null;
    },
    clearVerifyError(state) {
      state.verifyError = null;
    },
    clearRegistrationSuccess(state) {
      state.registrationSuccess = false;
    },
  },

  extraReducers: (builder) => {

    /* ── verifyCompany ──────────────────────── */
    builder
      .addCase(verifyCompany.pending, (state) => {
        state.verifyLoading = true;
        state.verifyError   = null;
      })
      .addCase(verifyCompany.fulfilled, (state) => {
        state.verifyLoading = false;
        // Navigation to next step is handled in the component
      })
      .addCase(verifyCompany.rejected, (state, action) => {
        state.verifyLoading = false;
        state.verifyError   = action.payload;
      });

    /* ── loginUser ──────────────────────────── */
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error   = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading         = false;
        state.isAuthenticated = true;
        state.user            = action.payload.user  ?? null;
        state.token           = action.payload.token ?? action.payload.access_token ?? null;
        if (state.token) localStorage.setItem('token', state.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      });

    /* ── registerUser ───────────────────────── */
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading             = true;
        state.error               = null;
        state.registrationSuccess = false;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading             = false;
        state.registrationSuccess = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      });
  },
});

export const {
  logout,
  clearError,
  clearVerifyError,
  clearRegistrationSuccess,
} = authSlice.actions;

export default authSlice.reducer;
