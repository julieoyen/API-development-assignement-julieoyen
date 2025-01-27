const API_URL =
  'https://api-development-assignement-julieoyen.onrender.com/register';

document
  .querySelector('#register-form')
  .addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      // Check if the response is OK before attempting to parse JSON
      if (!res.ok) {
        const errorData = await res.json();
        const errorMessages =
          errorData.errors?.map((err) => err.message).join(', ') ||
          'Registration failed. Please try again.';
        console.error('Registration Error:', errorMessages);
        return { error: errorMessages };
      }

      const responseData = await res.json();
      const userId = responseData.id;
      console.log('User ID:', userId);

      if (userId) {
        localStorage.setItem('authorID', userId);
        alert('Registration successful!');
        console.log('User ID saved to localStorage:', userId);
      } else {
        alert('Registration successful, but no user ID returned.');
      }
    } catch (error) {
      console.error('Registration Error:', error);
      return { error: 'An unexpected error occurred. Please try again.' };
    }
  });
