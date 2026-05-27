import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/layout/AuthLayout';

const VerificationCode = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputsRef = useRef([]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;

    setCode((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });

    if (value && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace' && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const codeValue = code.join('');
    if (codeValue.length !== 6) return;

    console.log('Verification code submitted', codeValue, location.state);
    navigate('/dashboard');
  };

  return (
    <AuthLayout cardStyle={{ maxWidth: '570px' }}>
      <div>
        <h2 className="text-center font-bold mb-3" style={{ color: '#184A61', fontSize: '22px' }}>
          Input verification code
        </h2>
        <p className="text-center text-sm text-[#989898] mb-8">
          We’ve sent a 6-digit OTP to your email Please enter it below to continue.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="flex justify-center flex-row gap-3 mb-5">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputsRef.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="h-[48px] w-[48px] rounded-lg border border-gray-300 text-center text-sm font-semibold focus:border-blue-500 focus:outline-none"
              />
            ))}
          </div>

          <p className="text-center text-sm text-[#184A61] mb-6">Resend OTP in 03:00</p>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-full rounded-lg border border-red-200 bg-white px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
            >
              Back
            </button>
            <button
              type="submit"
              className="w-full rounded-lg bg-[#E05252] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#E05252] disabled:cursor-not-allowed disabled:bg-[#e5e7eb]"
              disabled={code.join('').length !== 6}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default VerificationCode;
