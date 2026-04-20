const userSession = Cookies.get("user_session");

if (userSession) {
  console.log("Session found, redirecting to store...");
  // Redirect immediately
  window.location.href = "list-beers/lager.html";
}

// register.js
document.addEventListener("DOMContentLoaded", () => {
  const dateInput = document.getElementById("date");
  const ageInput = document.getElementById("age");
  const registerForm = document.getElementById("registerForm");

  // --- Part 1: Calculate Age Automatically ---
  dateInput.addEventListener("change", () => {
    const birthDate = new Date(dateInput.value);
    if (!isNaN(birthDate)) {
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      const dayDiff = today.getDate() - birthDate.getDate();

      // Adjust age if birthday hasn't occurred yet this year
      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
      }

      // Update the Age input field
      ageInput.value = age;

      // Visual Feedback for under-age users
      if (age < 20) {
        ageInput.style.color = "red";
        ageInput.style.borderColor = "red";
      } else {
        ageInput.style.color = "";
        ageInput.style.borderColor = "";
      }
    }
  });

  // --- Part 2: Validate and Submit Form ---
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // 1. Age Validation
    const age = parseInt(ageInput.value);
    if (isNaN(age) || age < 20) {
      alert(
        "Access Denied: You must be at least 20 years old to join BrewMaster.",
      );
      return;
    }

    // 2. Password Confirmation
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm_password").value;
    if (password !== confirmPassword) {
      alert("Error: Passwords do not match.");
      return;
    }

    // 3. Terms Confirmation
    const isVerified = document.getElementById("verify").checked;
    if (!isVerified) {
      alert(
        "Please confirm that you agree to the Terms and are of legal drinking age.",
      );
      return;
    }

    // 4. Prepare Data for Prisma
    const formData = {
      firstName: document.getElementById("name").value,
      lastName: document.getElementById("surname").value,
      email: document.getElementById("email").value,
      password: password,
      dateOfBirth: new Date(dateInput.value).toISOString(),
      gender:
        document.querySelector('input[name="gender"]:checked')?.value ||
        "other",
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/auth/register",
        formData,
      );

      alert("Success! Your account has been created.");
      localStorage.setItem("brewmaster_user_id", response.data.id);
      window.location.href = "index.html"; // Redirect to store
    } catch (error) {
      console.error("Registration Error:", error);
      const errorMsg =
        error.response?.data?.error || "Registration failed. Try again later.";
      alert(errorMsg);
    }
  });
});
