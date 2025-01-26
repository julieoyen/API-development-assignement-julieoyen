document
  .querySelector('#register-form')
  .addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    try {
      const res = await fetch('http://localhost:3004/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
      const responseData = await response.json();
      if (!response.ok) {
        const errorMessages =
          responseData.errors?.map((err) => err.message).join(', ') ||
          'Registration failed. Please try again.';
        return { error: errorMessages };
      }
      return responseData;
    } catch (error) {
      console.error('Registration Error:', error);
      return { error: 'An unexpected error occurred. Please try again.' };
    }
  });
