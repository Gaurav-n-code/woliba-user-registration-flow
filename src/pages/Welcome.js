import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate }              from 'react-router-dom';
import { resetRegistration }        from '../redux/slices/authSlice';
import AuthLayout                   from '../components/layout/AuthLayout';

/* ── Animated success checkmark ── */
const SuccessIcon = () => (
  <div
    className="flex items-center justify-center mx-auto mb-6"
    style={{
      width: '80px', height: '80px', borderRadius: '50%',
      background: 'linear-gradient(135deg, #E05252 0%, #f87171 100%)',
      boxShadow: '0 8px 24px rgba(224,82,82,0.3)',
    }}
  >
    <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  </div>
);

/* ── User detail row ── */
const DetailRow = ({ label, value }) => (
  <div className="flex items-center justify-between py-2"
    style={{ borderBottom: '1px solid #f3f4f6' }}>
    <span className="text-sm" style={{ color: '#6b7280' }}>{label}</span>
    <span className="text-sm font-semibold" style={{ color: '#184A61' }}>{value || '—'}</span>
  </div>
);

/* ══════════════════════════════════════════════════════════════
   PAGE — Step 8: Welcome Screen
══════════════════════════════════════════════════════════════ */
const Welcome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { registeredUser, registrationForm } = useSelector((s) => s.auth);

  /* Guard: must arrive here after successful registration */
  useEffect(() => {
    if (!registeredUser) navigate('/', { replace: true });
  }, [registeredUser, navigate]);

  /* Derived display values */
  const fullName  = registeredUser
    ? `${registeredUser.fname} ${registeredUser.lname}`
    : '';
  const email     = registeredUser?.email     || registrationForm.email || '';
  const uid       = registeredUser?.uid       || '';
  const userName  = registeredUser?.user_name || '';
  const companyId = registeredUser?.company_id || registrationForm.companyId || '';

  const handleGoToDashboard = () => navigate('/dashboard');

  const handleStartOver = () => {
    dispatch(resetRegistration());
    navigate('/');
  };

  if (!registeredUser) return null;

  return (
    <AuthLayout cardStyle={{ maxWidth: '480px' }}>

      {/* Success icon */}
      <SuccessIcon />

      {/* Heading */}
      <h2
        className="text-center font-bold mb-1"
        style={{ color: '#184A61', fontSize: '24px' }}
      >
        Welcome, {registeredUser.fname}! 🎉
      </h2>
      <p className="text-center text-sm text-gray-400 mb-6">
        Your Woliba account is ready. Let's start your wellness journey.
      </p>

      {/* User details card */}
      <div
        className="rounded-xl p-5 mb-6"
        style={{ background: '#fafafa', border: '1px solid #f0f0f0' }}
      >
        <p className="text-xs font-semibold uppercase tracking-wide mb-3"
          style={{ color: '#E05252', letterSpacing: '0.08em' }}>
          Account Details
        </p>
        <DetailRow label="Full Name"   value={fullName} />
        <DetailRow label="Email"       value={email} />
        <DetailRow label="Username"    value={userName} />
        <DetailRow label="User ID"     value={uid} />
        <DetailRow label="Company ID"  value={companyId} />
      </div>

      {/* Interests & Pillars summary */}
      <div className="mb-6">
        <div className="flex items-center gap-4">
          <div
            className="flex-1 rounded-xl p-4 text-center"
            style={{ background: '#FFF5F5', border: '1px solid #fde8e8' }}
          >
            <p className="text-2xl font-bold" style={{ color: '#E05252' }}>
              {registrationForm.selectedInterests.length}
            </p>
            <p className="text-xs text-gray-500 mt-1">Interests selected</p>
          </div>
          <div
            className="flex-1 rounded-xl p-4 text-center"
            style={{ background: '#F5F8FF', border: '1px solid #e0e8ff' }}
          >
            <p className="text-2xl font-bold" style={{ color: '#184A61' }}>3</p>
            <p className="text-xs text-gray-500 mt-1">Wellbeing pillars</p>
          </div>
        </div>
      </div>

      {/* CTA buttons */}
      <button
        type="button"
        onClick={handleGoToDashboard}
        style={{
          width: '100%', padding: '14px', borderRadius: '8px',
          border: 'none', background: '#E05252', color: '#fff',
          fontSize: '15px', fontWeight: 600, cursor: 'pointer',
          marginBottom: '10px',
          transition: 'background 0.15s',
        }}
      >
        Go to Dashboard
      </button>

      <button
        type="button"
        onClick={handleStartOver}
        style={{
          width: '100%', padding: '12px', borderRadius: '8px',
          border: '1px solid #e8e8e8', background: 'transparent',
          color: '#6b7280', fontSize: '14px', cursor: 'pointer',
        }}
      >
        Register another account
      </button>

    </AuthLayout>
  );
};

export default Welcome;
