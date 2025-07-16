document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const approvedUsers = ["user123", "dina456", "admin001"]; // כאן תכניס את המשתמשים שאתה מאשר
  const userId = document.getElementById("userId").value.trim();

  if (approvedUsers.includes(userId)) {
    window.location.href = "dashboard.html"; // תשנה ליעד שלך אחרי התחברות
  } else {
    document.getElementById("accessDenied").style.display = "block";
  }
});
