import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../services/authService';
import { getErrorMessage } from '../../utils/helpers';

/* ════════════════════════════════════════════════════════════════
   HELPERS
════════════════════════════════════════════════════════════════ */

/** Convert MM/DD/YYYY (DatePicker output) → YYYY-MM-DD (API format) */
const toApiDate = (mmddyyyy) => {
  if (!mmddyyyy) return null;
  const [m, d, y] = mmddyyyy.split('/');
  if (!y) return null;
  return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
};

/* ════════════════════════════════════════════════════════════════
   ASYNC THUNKS
════════════════════════════════════════════════════════════════ */

/** Step 1 — Verify company name & password */
export const verifyCompany = createAsyncThunk(
  'auth/verifyCompany',
  async ({ company_name, password }, { rejectWithValue }) => {
    try {
      return await authService.verifyCompany({ company_name, password });
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  },
);

/** Step 2 — Save user details & send OTP email */
export const saveUserDetails = createAsyncThunk(
  'auth/saveUserDetails',
  async ({ company_id, mail, fname, lname }, { rejectWithValue }) => {
    try {
      const res = await authService.saveUserDetails({ company_id, mail, fname, lname });
      return { apiResponse: res, mail, fname, lname };
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  },
);

/** Step 3 — Verify 6-digit OTP */
export const verifyOtp = createAsyncThunk(
  'auth/verifyOtp',
  async ({ otp, token }, { rejectWithValue }) => {
    try {
      return await authService.verifyOtp({ otp, token });
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  },
);

/** Step 3 — Re-send OTP (returns a fresh token) */
export const resendOtp = createAsyncThunk(
  'auth/resendOtp',
  async ({ email }, { rejectWithValue }) => {
    try {
      return await authService.resendOtp({ email });
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  },
);

/** Step 5 — Fetch all wellness interests from API */
export const fetchWellnessInterests = createAsyncThunk(
  'auth/fetchWellnessInterests',
  async (_, { rejectWithValue }) => {
    try {
      return await authService.getWellnessInterests();
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  },
);

/** Step 6 — Fetch all wellbeing pillars from API */
export const fetchWellbeingPillars = createAsyncThunk(
  'auth/fetchWellbeingPillars',
  async (_, { rejectWithValue }) => {
    try {
      return await authService.getWellbeingPillars(1);
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  },
);

/** Step 7 — Submit final registration (reads all data from Redux state) */
export const completeRegistration = createAsyncThunk(
  'auth/completeRegistration',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { registrationForm } = getState().auth;
      const {
        firstName, lastName, password, birthday, phoneNumber,
        workAnniversary, termsAccepted, otpToken,
        selectedInterests, selectedPillars,
      } = registrationForm;

      if (selectedPillars.length !== 3) {
        return rejectWithValue('Please select exactly 3 wellbeing pillars.');
      }
      if (!termsAccepted) {
        return rejectWithValue('You must accept the Terms of Service and Privacy Policy.');
      }

      const payload = {
        fname:                firstName,
        lname:                lastName,
        password,
        time_zone:            Intl.DateTimeFormat().resolvedOptions().timeZone,
        token:                otpToken,
        areas_of_interest:    selectedInterests,
        wellbeing_pillars:    selectedPillars,
        accepted_privacy_policy: termsAccepted,
        birthday:             toApiDate(birthday),
        phone_number:         phoneNumber,
        user_type:            0,
        language_id:          1,
        work_anniversary:     workAnniversary ? toApiDate(workAnniversary) : undefined,
      };

      return await authService.completeRegistration(payload);
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  },
);

/* ════════════════════════════════════════════════════════════════
   INITIAL STATE
════════════════════════════════════════════════════════════════ */
const initialRegistrationForm = {
  // Step 1
  companyId:       null,
  companyName:     '',
  // Step 2
  email:           '',
  firstName:       '',
  lastName:        '',
  otpToken:        '',      // AES token (or JWT on resend) from backend
  // Step 4
  password:        '',
  birthday:        '',      // stored as MM/DD/YYYY; converted to YYYY-MM-DD in thunk
  phoneNumber:     '',
  workAnniversary: '',
  termsAccepted:   false,
  // Step 5
  wellnessInterests: [],
  selectedInterests: [],
  // Step 6
  wellbeingPillars:  [],
  selectedPillars:   [],
};

const initialState = {
  /* ── Registration multi-step form data ── */
  registrationForm: { ...initialRegistrationForm },

  /* ── Post-registration ── */
  registeredUser:    null,
  registrationToken: localStorage.getItem('authToken') || null,
  isAuthenticated:   !!localStorage.getItem('authToken'),

  /* ── Per-step async flags ── */
  verifyCompanyLoading:     false,
  verifyCompanyError:       null,

  saveDetailsLoading:       false,
  saveDetailsError:         null,

  verifyOtpLoading:         false,
  verifyOtpError:           null,

  resendOtpLoading:         false,
  resendOtpError:           null,

  wellnessInterestsLoading: false,
  wellnessInterestsError:   null,

  wellbeingPillarsLoading:  false,
  wellbeingPillarsError:    null,

  completeRegLoading:       false,
  completeRegError:         null,
};

/* ════════════════════════════════════════════════════════════════
   SLICE
════════════════════════════════════════════════════════════════ */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /** Merge any subset of registration form fields into state. */
    setFormData(state, action) {
      state.registrationForm = { ...state.registrationForm, ...action.payload };
    },
    /** Replace the selected interests array (array of numeric API IDs). */
    setSelectedInterests(state, action) {
      state.registrationForm.selectedInterests = action.payload;
    },
    /** Replace the selected pillars array (exactly 3 numeric API IDs). */
    setSelectedPillars(state, action) {
      state.registrationForm.selectedPillars = action.payload;
    },
    /** Clear a specific error field by key. */
    clearError(state, action) {
      const key = action.payload;
      if (key && state[key] !== undefined) state[key] = null;
    },
    /** Clear all errors at once. */
    clearAllErrors(state) {
      state.verifyCompanyError = null;
      state.saveDetailsError   = null;
      state.verifyOtpError     = null;
      state.resendOtpError     = null;
      state.completeRegError   = null;
    },
    /** Clear just the verify company error (used in Register.js). */
    clearVerifyError(state) {
      state.verifyCompanyError = null;
    },
    /** Reset all registration data (used after successful registration or logout). */
    resetRegistration(state) {
      state.registrationForm = { ...initialRegistrationForm };
      state.registeredUser   = null;
      state.completeRegError = null;
    },
    /** Log out the authenticated user. */
    logout(state) {
      state.isAuthenticated  = false;
      state.registrationToken = null;
      state.registeredUser   = null;
      localStorage.removeItem('authToken');
    },
  },

  extraReducers: (builder) => {

    /* ── verifyCompany ──────────────────────────────────────────── */
    builder
      .addCase(verifyCompany.pending, (state) => {
        state.verifyCompanyLoading = true;
        state.verifyCompanyError   = null;
      })
      .addCase(verifyCompany.fulfilled, (state, action) => {
        state.verifyCompanyLoading = false;
        const company = action.payload?.data?.[0];
        if (company) {
          state.registrationForm.companyId   = company.id;
          state.registrationForm.companyName = company.company_name;
        }
      })
      .addCase(verifyCompany.rejected, (state, action) => {
        state.verifyCompanyLoading = false;
        state.verifyCompanyError   = action.payload;
      });

    /* ── saveUserDetails ────────────────────────────────────────── */
    builder
      .addCase(saveUserDetails.pending, (state) => {
        state.saveDetailsLoading = true;
        state.saveDetailsError   = null;
      })
      .addCase(saveUserDetails.fulfilled, (state, action) => {
        state.saveDetailsLoading = false;
        const { apiResponse, mail, fname, lname } = action.payload;
        state.registrationForm.email     = mail;
        state.registrationForm.firstName = fname;
        state.registrationForm.lastName  = lname;
        state.registrationForm.otpToken  = apiResponse?.data?.token || '';
      })
      .addCase(saveUserDetails.rejected, (state, action) => {
        state.saveDetailsLoading = false;
        state.saveDetailsError   = action.payload;
      });

    /* ── verifyOtp ──────────────────────────────────────────────── */
    builder
      .addCase(verifyOtp.pending, (state) => {
        state.verifyOtpLoading = true;
        state.verifyOtpError   = null;
      })
      .addCase(verifyOtp.fulfilled, (state) => {
        state.verifyOtpLoading = false;
        // No new fields — success is the signal to navigate
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.verifyOtpLoading = false;
        state.verifyOtpError   = action.payload;
      });

    /* ── resendOtp ──────────────────────────────────────────────── */
    builder
      .addCase(resendOtp.pending, (state) => {
        state.resendOtpLoading = true;
        state.resendOtpError   = null;
      })
      .addCase(resendOtp.fulfilled, (state, action) => {
        state.resendOtpLoading = false;
        // Replace the OTP token with the new one issued by the resend endpoint
        const newToken = action.payload?.data?.token;
        if (newToken) state.registrationForm.otpToken = newToken;
      })
      .addCase(resendOtp.rejected, (state, action) => {
        state.resendOtpLoading = false;
        state.resendOtpError   = action.payload;
      });

    /* ── fetchWellnessInterests ─────────────────────────────────── */
    builder
      .addCase(fetchWellnessInterests.pending, (state) => {
        state.wellnessInterestsLoading = true;
        state.wellnessInterestsError   = null;
      })
      .addCase(fetchWellnessInterests.fulfilled, (state, action) => {
        state.wellnessInterestsLoading = false;
        state.registrationForm.wellnessInterests = action.payload?.data || [];
      })
      .addCase(fetchWellnessInterests.rejected, (state, action) => {
        state.wellnessInterestsLoading = false;
        state.wellnessInterestsError   = action.payload;
      });

    /* ── fetchWellbeingPillars ──────────────────────────────────── */
    builder
      .addCase(fetchWellbeingPillars.pending, (state) => {
        state.wellbeingPillarsLoading = true;
        state.wellbeingPillarsError   = null;
      })
      .addCase(fetchWellbeingPillars.fulfilled, (state, action) => {
        state.wellbeingPillarsLoading = false;
        state.registrationForm.wellbeingPillars = action.payload?.data || [];
      })
      .addCase(fetchWellbeingPillars.rejected, (state, action) => {
        state.wellbeingPillarsLoading = false;
        state.wellbeingPillarsError   = action.payload;
      });

    /* ── completeRegistration ───────────────────────────────────── */
    builder
      .addCase(completeRegistration.pending, (state) => {
        state.completeRegLoading = true;
        state.completeRegError   = null;
      })
      .addCase(completeRegistration.fulfilled, (state, action) => {
        state.completeRegLoading  = false;
        state.registeredUser      = action.payload?.data?.user || null;
        const token               = action.payload?.data?.token;
        if (token) {
          state.registrationToken = token;
          state.isAuthenticated   = true;
          localStorage.setItem('authToken', token);
        }
      })
      .addCase(completeRegistration.rejected, (state, action) => {
        state.completeRegLoading = false;
        state.completeRegError   = action.payload;
      });
  },
});

export const {
  setFormData,
  setSelectedInterests,
  setSelectedPillars,
  clearError,
  clearAllErrors,
  clearVerifyError,
  resetRegistration,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
