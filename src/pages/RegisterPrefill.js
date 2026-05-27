import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/layout/AuthLayout';
import Input from '../components/common/Input';

const RegisterPrefill = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email: stateEmail, companyName: stateCompany } = location.state || {};

  const [firstName, setFirstName] = useState(() => localStorage.getItem('prefillFirstName') || '');
  const [lastName, setLastName] = useState(() => localStorage.getItem('prefillLastName') || '');
  const [email, setEmail] = useState(stateEmail || localStorage.getItem('prefillEmail') || '');
  const [companyName, setCompanyName] = useState(stateCompany || localStorage.getItem('prefillCompany') || '');

  useEffect(() => {
    // if no essential data, redirect back to verify page
    if (!email || !companyName) {
      navigate('/verify-code', { replace: true });
    }
  }, [email, companyName, navigate]);

  const handleNext = (e) => {
    e.preventDefault();
    localStorage.setItem('prefillEmail', email);
    localStorage.setItem('prefillCompany', companyName);
    localStorage.setItem('prefillFirstName', firstName);
    localStorage.setItem('prefillLastName', lastName);
    navigate('/login-credentials');
  };

  return (
    <AuthLayout cardStyle={{ maxWidth: '520px' }}>
      <form onSubmit={handleNext} className="space-y-4">
        <h2 className="text-center font-bold mb-3" style={{ color: '#184A61', fontSize: '22px' }}>Registration</h2>

        <div>
          <Input
            label="First name"
            name="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>

        <div>
          <Input
            label="Last name"
            name="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <div>
          <Input
            label="Work email"
            name="prefillEmail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled
          />
        </div>

        <div>
          <Input
            label="Company name"
            name="prefillCompany"
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
            disabled
          />
        </div>

        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="w-48 rounded-lg bg-[#E05252] px-4 py-3 text-sm font-semibold text-white"
          >
            Next
          </button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default RegisterPrefill;
