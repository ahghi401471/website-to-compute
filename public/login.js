const authorizedUsers = [
  { username: "hagai", password: "0504103150" },
  { username: "admin", password: "secret" }
];

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  const user = authorizedUsers.find(
    u => u.username === username && u.password === password
  );

  if (user) {
    localStorage.setItem("isLoggedIn", "true");
    window.location.href = "index.html";
  } else {
    alert("שם משתמש או סיסמה שגויים.");
  }
});
