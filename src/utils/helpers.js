/* ──────────────────────────────────────────
   helpers.js — General utility functions
   ────────────────────────────────────────── */

/** Capitalise first letter of a string */
export const capitalize = (str) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : '';

/** Extract readable error message from Axios error */
export const getErrorMessage = (error) => {
  if (error?.response?.data?.message) return error.response.data.message;
  if (error?.response?.data?.error) return error.response.data.error;
  if (error?.message) return error.message;
  return 'Something went wrong. Please try again.';
};

/** Pause execution for ms milliseconds */
export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** Format ISO date to readable string */
export const formatDate = (iso) => {
  if (!iso) return '';
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(iso));
};
