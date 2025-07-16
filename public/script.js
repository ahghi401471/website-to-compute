if (localStorage.getItem("isLoggedIn") !== "true") {
  window.location.href = "login.html";
}
document.getElementById("tokenForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nsUrl = document.getElementById("nsUrl").value.trim();
  const token = document.getElementById("token").value.trim();
  const resultBox = document.getElementById("analysisResult");
  const dataSection = document.getElementById("dataSection");

  resultBox.textContent = "טוען נתונים...";

  try {
    const response = await fetch(`${nsUrl}/api/v1/entries.json?count=100&token=${token}`);
    const data = await response.json();

    if (!data.length) {
      resultBox.textContent = "לא נמצאו נתונים.";
      return;
    }

    const values = data.map(e => e.sgv).filter(v => typeof v === "number");
    const avg = (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1);

    const high = values.filter(v => v > 180).length;
    const low = values.filter(v => v < 70).length;
    const inRange = values.length - high - low;

    resultBox.textContent = `
    ✅ מספר קריאות: ${values.length}
    🎯 ממוצע: ${avg}
    🌿 בטווח (70-180): ${(inRange / values.length * 100).toFixed(1)}%
    🔺 מעל 180: ${(high / values.length * 100).toFixed(1)}%
    🔻 מתחת 70: ${(low / values.length * 100).toFixed(1)}%
    `;

    dataSection.style.display = "block";

  } catch (error) {
    resultBox.textContent = "❌ שגיאה בטעינת הנתונים. ודא שהכתובת והטוקן נכונים.";
  }
});

