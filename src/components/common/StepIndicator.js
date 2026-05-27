import React from 'react';

/**
 * StepIndicator — Shows progress through multi-step form
 * Props: steps (array of strings), currentStep (0-based index)
 */
const StepIndicator = ({ steps, currentStep }) => {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between relative">
        {/* Progress bar background */}
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 -z-0" />
        {/* Active progress bar */}
        <div
          className="absolute top-4 left-0 h-0.5 bg-blue-600 transition-all duration-500 -z-0"
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;

          return (
            <div key={step} className="flex flex-col items-center z-10">
              {/* Circle */}
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-semibold
                  border-2 transition-all duration-300
                  ${isCompleted
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : isActive
                    ? 'bg-white border-blue-600 text-blue-600'
                    : 'bg-white border-gray-300 text-gray-400'
                  }`}
              >
                {isCompleted ? (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
              {/* Label */}
              <span
                className={`mt-2 text-xs font-medium hidden sm:block ${
                  isActive ? 'text-blue-600' : isCompleted ? 'text-gray-600' : 'text-gray-400'
                }`}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;
