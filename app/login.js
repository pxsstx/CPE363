const userSession = Cookies.get("user_session");

if (userSession) {
  console.log("Session found, redirecting to store...");
  // Redirect immediately
  window.location.href = "list-beers/lager.html";
}

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  // Basic check to ensure the form exists before adding listener
  if (!loginForm) return;

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const remember = document.getElementById("remember").checked;

    // Inside your loginForm.addEventListener submit...
    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        email,
        password,
      });

      const { token, user } = response.data;

      if (remember) {
        // 1. Store JWT Token (For API Authorization)
        Cookies.set("auth_token", token, { expires: 7, path: "/" });

        // 2. Store User Profile (For UI display only)
        const sessionData = JSON.stringify(user);
        Cookies.set("user_session", sessionData, { expires: 7, path: "/" });
      }

      // 3. Set Axios Default Header for future requests
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      window.location.href = "list-beers/lager.html";
    } catch (error) {
      console.error("Login Error:", error);

      // Handle cases where the server is down or returns an error
      const errorMessage =
        error.response?.data?.error ||
        "Login failed. Please check your credentials or server connection.";
      alert(errorMessage);
    }
  });
});
