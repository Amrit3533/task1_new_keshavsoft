// Form Handlers code
function initializeFormHandlers() {
  // Contact Form
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", handleContactForm);
  }

  // Quick Contact Form
  const quickContactForm = document.getElementById("quickContactForm");
  if (quickContactForm) {
    quickContactForm.addEventListener("submit", handleQuickContactForm);
  }

  // Internship Form
  const internshipForm = document.getElementById("internshipForm");
  if (internshipForm) {
    internshipForm.addEventListener("submit", handleInternshipForm);
  }

  // Login Form
  const loginForms = document.querySelectorAll("form");
  loginForms.forEach((form) => {
    if (form.querySelector("#loginEmail")) {
      form.addEventListener("submit", handleLoginForm);
    }
    if (form.querySelector("#signupEmail")) {
      form.addEventListener("submit", handleSignupForm);
    }
  });
}

function handleContactForm(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);

  // Validation
  if (
    !data.firstName ||
    !data.lastName ||
    !data.email ||
    !data.subject ||
    !data.message
  ) {
    showAlert("Please fill in all required fields.", "warning");
    return;
  }

  // Email validation
  if (!isValidEmail(data.email)) {
    showAlert("Please enter a valid email address.", "warning");
    return;
  }

  // Simulate form submission
  const submitBtn = e.target.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;

  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
  submitBtn.disabled = true;

  setTimeout(() => {
    showAlert(
      "Thank you for your message! We'll get back to you within 24 hours.",
      "success"
    );
    e.target.reset();
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  }, 2000);
}

function handleQuickContactForm(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);

  if (!data.quickName || !data.quickEmail || !data.quickInquiry) {
    showAlert("Please fill in all required fields.", "warning");
    return;
  }

  if (!isValidEmail(data.quickEmail)) {
    showAlert("Please enter a valid email address.", "warning");
    return;
  }

  const submitBtn = e.target.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;

  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
  submitBtn.disabled = true;

  setTimeout(() => {
    showAlert("Quick message sent! We'll respond shortly.", "success");
    e.target.reset();
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;

    // Close modal
    const modal = bootstrap.Modal.getInstance(
      document.getElementById("quickContactModal")
    );
    modal.hide();
  }, 1500);
}

function handleInternshipForm(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);

  if (
    !data.firstName ||
    !data.lastName ||
    !data.email ||
    !data.phone ||
    !data.college ||
    !data.year ||
    !data.program ||
    !data.motivation
  ) {
    showAlert("Please fill in all required fields.", "warning");
    return;
  }

  if (!isValidEmail(data.email)) {
    showAlert("Please enter a valid email address.", "warning");
    return;
  }

  if (!document.getElementById("agreeTerms").checked) {
    showAlert("Please agree to the program terms and conditions.", "warning");
    return;
  }

  const submitBtn = e.target.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;

  submitBtn.innerHTML =
    '<i class="fas fa-spinner fa-spin me-2"></i>Submitting...';
  submitBtn.disabled = true;

  setTimeout(() => {
    showAlert(
      "Application submitted successfully! We'll review your application and contact you within 48 hours.",
      "success"
    );
    e.target.reset();
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;

    // Close modal
    const modal = bootstrap.Modal.getInstance(
      document.getElementById("contactModal")
    );
    modal.hide();
  }, 2500);
}

function handleLoginForm(e) {
  e.preventDefault();

  const email = e.target.querySelector("#loginEmail").value;
  const password = e.target.querySelector("#loginPassword").value;

  if (!email || !password) {
    showAlert("Please enter both email and password.", "warning");
    return;
  }

  if (!isValidEmail(email)) {
    showAlert("Please enter a valid email address.", "warning");
    return;
  }

  const submitBtn = e.target.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;

  submitBtn.innerHTML =
    '<i class="fas fa-spinner fa-spin me-2"></i>Signing In...';
  submitBtn.disabled = true;

  setTimeout(() => {
    showAlert("Welcome back! Redirecting to dashboard...", "success");
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;

    // Close modal and redirect
    const modal = bootstrap.Modal.getInstance(
      document.getElementById("loginModal")
    );
    modal.hide();

    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1000);
  }, 2000);
}

function handleSignupForm(e) {
  e.preventDefault();

  const firstName = e.target.querySelector("#signupFirstName").value;
  const lastName = e.target.querySelector("#signupLastName").value;
  const email = e.target.querySelector("#signupEmail").value;
  const password = e.target.querySelector("#signupPassword").value;
  const confirmPassword = e.target.querySelector("#confirmPassword").value;

  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    showAlert("Please fill in all fields.", "warning");
    return;
  }

  if (!isValidEmail(email)) {
    showAlert("Please enter a valid email address.", "warning");
    return;
  }

  if (password.length < 6) {
    showAlert("Password must be at least 6 characters long.", "warning");
    return;
  }

  if (password !== confirmPassword) {
    showAlert("Passwords do not match.", "warning");
    return;
  }

  const agreeTerms =
    e.target.querySelector("#agreeTerms") ||
    e.target.querySelector("#agreeTermsSignup");
  if (agreeTerms && !agreeTerms.checked) {
    showAlert("Please agree to the Terms of Service.", "warning");
    return;
  }

  const submitBtn = e.target.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;

  submitBtn.innerHTML =
    '<i class="fas fa-spinner fa-spin me-2"></i>Creating Account...';
  submitBtn.disabled = true;

  setTimeout(() => {
    showAlert(
      "Account created successfully! Welcome to KeshavSoft!",
      "success"
    );
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;

    // Close modal and redirect
    const modal = bootstrap.Modal.getInstance(
      document.getElementById("signupModal")
    );
    modal.hide();

    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1000);
  }, 2500);
}

// Made Bootstrap tooltips
function initializeTooltips() {
  const tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
}

//alert functionality
function showAlert(message, type = "info") {
  // Remove existing alerts
  const existingAlerts = document.querySelectorAll(".custom-alert");
  existingAlerts.forEach((alert) => alert.remove());

  // Create alert element
  const alertDiv = document.createElement("div");
  alertDiv.className = `alert alert-${type} alert-dismissible fade show custom-alert`;
  alertDiv.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 9999;
            min-width: 300px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;

  alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;

  document.body.appendChild(alertDiv);

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (alertDiv.parentNode) {
      alertDiv.remove();
    }
  }, 5000);
}

// Carousel auto-play control code
const heroCarousel = document.getElementById("heroCarousel");
if (heroCarousel) {
  const carousel = new bootstrap.Carousel(heroCarousel, {
    interval: 5000,
    wrap: true,
  });

  // Pause on hover
  heroCarousel.addEventListener("mouseenter", () => {
    carousel.pause();
  });

  heroCarousel.addEventListener("mouseleave", () => {
    carousel.cycle();
  });
}