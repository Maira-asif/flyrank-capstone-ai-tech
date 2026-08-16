// Validation rules for the settings form.
// Kept framework-agnostic and pure so it's easy to unit test.

function validateUsername(value) {
  if (!value) return 'Username is required.';
  if (value.length < 3 || value.length > 20) return 'Username must be 3-20 characters.';
  if (!/^[a-zA-Z0-9]+$/.test(value)) return 'Username must be alphanumeric only.';
  return null;
}

function validateEmail(value) {
  if (!value) return 'Email is required.';
  // Intentionally simple RFC-adjacent check, not a full RFC 5322 parser.
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(value)) return 'Enter a valid email address.';
  return null;
}

function validatePassword(value) {
  if (!value) return 'Password is required.';
  if (value.length < 8) return 'Password must be at least 8 characters.';
  if (!/[0-9]/.test(value)) return 'Password must include at least one number.';
  return null;
}

function validateForm({ username, email, password }) {
  return {
    username: validateUsername(username),
    email: validateEmail(email),
    password: validatePassword(password),
  };
}

function isFormValid(errors) {
  return Object.values(errors).every((e) => e === null);
}

// Guard module.exports so this file works both in Node (tests) and loaded
// directly in the browser via <script> — `module` doesn't exist there and
// referencing it unguarded throws a ReferenceError on page load.
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { validateUsername, validateEmail, validatePassword, validateForm, isFormValid };
}
