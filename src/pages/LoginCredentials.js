import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector }   from 'react-redux';
import { useNavigate }                from 'react-router-dom';
import { setFormData }                from '../redux/slices/authSlice';
import AuthLayout                     from '../components/layout/AuthLayout';
import Input                          from '../components/common/Input';
import DatePicker                     from '../components/common/DatePicker';

/* ══════════════════════════════════════════════════════════════
   Step 4 — Login Credentials & Profile
   No API call — data is stored in Redux for the final submission.
══════════════════════════════════════════════════════════════ */
const LoginCredentials = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { registrationForm } = useSelector((s) => s.auth);

  /* ── Guard: must arrive here after OTP verification ── */
  useEffect(() => {
    if (!registrationForm.otpToken) navigate('/', { replace: true });
  }, [registrationForm.otpToken, navigate]);

  /* ── Local form state (seeded from Redux if back-navigated) ── */
  const [password,        setPassword]        = useState(registrationForm.password        || '');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [birthday,        setBirthday]        = useState(registrationForm.birthday        || '');
  const [contact,         setContact]         = useState(registrationForm.phoneNumber     || '');
  const [workAnniversary, setWorkAnniversary] = useState(registrationForm.workAnniversary || '');
  const [agree,           setAgree]           = useState(registrationForm.termsAccepted   || false);
  const [errors,          setErrors]          = useState({});

  /* ── Live validation ── */
  useEffect(() => {
    const e = {};
    if (password && password.length < 8)
      e.password = 'Password must be at least 8 characters';
    if (confirmPassword && password !== confirmPassword)
      e.confirmPassword = 'Passwords do not match. Please re-enter.';
    if (contact && !/^\+?[0-9\s-]{7,15}$/.test(contact))
      e.contact = 'Enter a valid contact number';
    setErrors(e);
  }, [password, confirmPassword, contact]);

  const isValid = () =>
    password?.length >= 8 &&
    confirmPassword === password &&
    !!birthday &&
    contact && /^\+?[0-9\s-]{7,15}$/.test(contact) &&
    agree;

  /* ── Back ── */
  const handleBack = () => navigate(-1);

  /* ── Submit ── */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid()) return;

    dispatch(setFormData({
      password,
      birthday,           // stored as MM/DD/YYYY; converted in completeRegistration thunk
      phoneNumber:     contact,
      workAnniversary: workAnniversary || '',
      termsAccepted:   agree,
    }));

    navigate('/wellness-interests');
  };

  /* ── Render ── */
  return (
    <AuthLayout cardStyle={{ maxWidth: '650px' }}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2
          className="text-center font-bold mb-3"
          style={{ color: '#184A61', fontSize: '22px' }}
        >
          Login Credentials
        </h2>

        {/* Password */}
        <div>
          <Input
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter password"
            error={errors.password}
          />
        </div>

        {/* Confirm Password */}
        <div>
          <Input
            label="Confirm password"
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Re-enter password"
            error={errors.confirmPassword}
          />
        </div>

        {/* Birthday */}
        <div>
          <DatePicker
            label="Birthday"
            value={birthday}
            onChange={(val) => setBirthday(val)}
            placeholder="Select date of birth [MM/DD/YYYY]"
            required
            maxYear={new Date().getFullYear() - 13}
          />
        </div>

        {/* Contact Number */}
        <div>
          <Input
            label="Contact number"
            name="contact"
            type="tel"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
            placeholder="Enter contact number"
            error={errors.contact}
          />
        </div>
        {/* Terms */}
        <div className="flex items-center gap-3 mt-1">
          <input
            id="agree"
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            className="sr-only"
            aria-hidden="true"
          />
          <button
            type="button"
            onClick={() => setAgree(!agree)}
            aria-pressed={agree}
            aria-labelledby="agree-label"
            className={`
              flex items-center justify-center h-5 w-5 rounded-full border-2
              focus:outline-none flex-shrink-0 transition-colors duration-150
              ${agree ? 'border-[#E05252]' : 'border-gray-300'} bg-white
            `}
          >
            {agree && <span className="h-2.5 w-2.5 rounded-full bg-[#E05252] block" />}
          </button>
          <label id="agree-label" htmlFor="agree" className="text-sm text-gray-700">
            I agree to Woliba's{' '}
            <span className="text-pink-500 cursor-pointer hover:underline">Terms of Service</span>
            {' '}and{' '}
            <span className="text-pink-500 cursor-pointer hover:underline">Privacy Policy</span>.
          </label>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-2 mt-4">
          <button
            type="button"
            onClick={handleBack}
            className="rounded-lg border border-[#E05252] px-5 py-4 w-[150px] text-base text-[#E05252]"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={!isValid()}
            className={`rounded-lg px-5 py-4 w-[150px] text-base font-semibold text-white ${isValid() ? 'bg-[#E05252]' : 'bg-gray-300 cursor-not-allowed'}`}
          >
            Next
          </button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default LoginCredentials;
