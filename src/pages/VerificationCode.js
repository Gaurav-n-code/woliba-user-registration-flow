import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector }                        from 'react-redux';
import { useNavigate }                                     from 'react-router-dom';
import { verifyOtp, resendOtp, clearAllErrors }            from '../redux/slices/authSlice';
import AuthLayout                                          from '../components/layout/AuthLayout';
import Alert                                               from '../components/common/Alert';

const RESEND_SECONDS = 180; // 3 minutes

/* ── Pad a number to 2 digits ── */
const pad2 = (n) => String(n).padStart(2, '0');

/* ══════════════════════════════════════════════════════════════
   OTP Verification — Step 3
══════════════════════════════════════════════════════════════ */
const VerificationCode = () => {
  const dispatch  = useDispatch();
  const navigate  = useNavigate();

  const {
    registrationForm,
    verifyOtpLoading,
    verifyOtpError,
    resendOtpLoading,
    resendOtpError,
  } = useSelector((s) => s.auth);

  const { email, otpToken } = registrationForm;

  /* ── Guard: must arrive here after step 2 ── */
  useEffect(() => {
    if (!otpToken) navigate('/', { replace: true });
  }, [otpToken, navigate]);

  /* ── OTP digit state ── */
  const [code,    setCode]    = useState(['', '', '', '', '', '']);
  const [apiError, setApiError] = useState('');
  const inputsRef = useRef([]);

  /* Auto-focus first input on mount */
  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  /* Clear API error when code changes */
  useEffect(() => {
    if (apiError) setApiError('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  /* ── Countdown timer ── */
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
  const [canResend,   setCanResend]   = useState(false);

  useEffect(() => {
    if (secondsLeft <= 0) { setCanResend(true); return; }
    const id = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [secondsLeft]);

  const restartTimer = useCallback(() => {
    setSecondsLeft(RESEND_SECONDS);
    setCanResend(false);
  }, []);

  /* ── Input handlers ── */
  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;
    setCode((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
    if (value && index < 5) inputsRef.current[index + 1]?.focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowLeft'  && index > 0) inputsRef.current[index - 1]?.focus();
    if (e.key === 'ArrowRight' && index < 5) inputsRef.current[index + 1]?.focus();
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;
    e.preventDefault();
    const next = [...code];
    for (let i = 0; i < 6; i++) next[i] = pasted[i] || '';
    setCode(next);
    const focusIdx = Math.min(pasted.length, 5);
    inputsRef.current[focusIdx]?.focus();
  };

  /* ── Submit ── */
  const codeValue   = code.join('');
  const codeComplete = codeValue.length === 6;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!codeComplete || verifyOtpLoading) return;
    dispatch(clearAllErrors());
    try {
      await dispatch(verifyOtp({ otp: codeValue, token: otpToken })).unwrap();
      navigate('/login-credentials');
    } catch (_) { /* verifyOtpError shown via Alert */ }
  };

  /* ── Resend ── */
  const handleResend = async () => {
    if (!canResend || resendOtpLoading) return;
    dispatch(clearAllErrors());
    try {
      await dispatch(resendOtp({ email })).unwrap();
      // otpToken is updated in Redux by the fulfilled case
      setCode(['', '', '', '', '', '']);
      restartTimer();
      inputsRef.current[0]?.focus();
    } catch (_) { /* resendOtpError shown via Alert */ }
  };

  /* ── Render ── */
  return (
    <AuthLayout cardStyle={{ maxWidth: '570px' }}>
      <div>
        <h2
          className="text-center font-bold mb-3"
          style={{ color: '#184A61', fontSize: '22px' }}
        >
          Input verification code
        </h2>

        <p className="text-center text-sm text-[#989898] mb-1">
          We've sent a 6-digit OTP to your email.
        </p>
        {email && (
          <p className="text-center text-sm font-medium mb-4" style={{ color: '#184A61' }}>
            {email}
          </p>
        )}

        {/* API error */}
        {(verifyOtpError || resendOtpError) && (
          <div className="mb-4">
            <Alert type="error" message={verifyOtpError || resendOtpError} />
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* OTP inputs */}
          <div className="flex justify-center gap-3 mb-5" onPaste={handlePaste}>
            {code.map((digit, i) => (
              <input
                key={i}
                ref={(el) => (inputsRef.current[i] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                disabled={verifyOtpLoading}
                className={`
                  h-[48px] w-[48px] rounded-lg border text-center text-base font-semibold
                  focus:outline-none transition-colors
                  ${digit ? 'border-[#E05252] text-[#184A61]' : 'border-gray-300 text-gray-700'}
                  focus:border-[#E05252]
                  disabled:bg-gray-50 disabled:cursor-not-allowed
                `}
              />
            ))}
          </div>

          {/* Countdown / Resend */}
          <div className="text-center mb-6">
            {canResend ? (
              <button
                type="button"
                onClick={handleResend}
                disabled={resendOtpLoading}
                className="text-sm font-medium transition-opacity"
                style={{ color: '#E05252' }}
              >
                {resendOtpLoading ? 'Resending…' : 'Resend OTP'}
              </button>
            ) : (
              <p className="text-sm" style={{ color: '#184A61' }}>
                Resend OTP in{' '}
                <span className="font-semibold">
                  {pad2(Math.floor(secondsLeft / 60))}:{pad2(secondsLeft % 60)}
                </span>
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              disabled={verifyOtpLoading}
              className="w-full rounded-lg border border-[#E05252] bg-white px-4 py-3 text-sm font-semibold text-[#E05252] transition hover:bg-red-50 disabled:opacity-50"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={!codeComplete || verifyOtpLoading}
              className="w-full rounded-lg px-4 py-3 text-sm font-semibold text-white transition flex items-center justify-center gap-2"
              style={{
                backgroundColor: !codeComplete || verifyOtpLoading ? '#e5e7eb' : '#E05252',
                color:           !codeComplete || verifyOtpLoading ? '#9ca3af' : '#fff',
                cursor:          !codeComplete || verifyOtpLoading ? 'not-allowed' : 'pointer',
              }}
            >
              {verifyOtpLoading && (
                <span
                  className="inline-block h-4 w-4 rounded-full border-2 animate-spin"
                  style={{ borderColor: 'rgba(255,255,255,0.35)', borderTopColor: '#fff' }}
                />
              )}
              {verifyOtpLoading ? 'Verifying…' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default VerificationCode;
