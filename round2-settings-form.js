(function () {
  const form = document.getElementById('settingsForm');
  const submitBtn = document.getElementById('submitBtn');
  const fields = ['username', 'email', 'password'];

  function updateFieldError(field, message) {
    const input = document.getElementById(field);
    const errorEl = document.getElementById(`${field}-error`);
    errorEl.textContent = message || '';
    input.setAttribute('aria-invalid', message ? 'true' : 'false');
  }

  function runValidation() {
    const values = {
      username: document.getElementById('username').value,
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
    };
    const errors = validateForm(values);
    fields.forEach((f) => updateFieldError(f, errors[f]));
    submitBtn.disabled = !isFormValid(errors);
    return { values, errors };
  }

  fields.forEach((f) => {
    document.getElementById(f).addEventListener('input', runValidation);
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const { values, errors } = runValidation();
    if (!isFormValid(errors)) return;
    console.log('Saved:', values);
    // In a real app: send to backend here.
  });

  // Run once on load so the submit button starts in the correct disabled state.
  runValidation();
})();
