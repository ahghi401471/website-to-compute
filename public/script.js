async function analyze() {
  const url = document.getElementById("url").value;
  const resultBox = document.getElementById("result");
  resultBox.textContent = "טוען נתונים...";

  try {
    const response = await fetch(`${url}/api/v1/entries.json?count=50`);
    const data = await response.json();

    if (!data.length) {
      resultBox.textContent = "לא נמצאו נתונים";
      return;
    }

    const values = data.map(e => e.sgv).filter(v => typeof v === "number");
    const avg = (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1);

    const high = values.filter(v => v > 180).length;
    const low = values.filter(v => v < 70).length;
    const inRange = values.length - high - low;

    resultBox.textContent = `
מספר קריאות: ${values.length}
ממוצע: ${avg}
באזור תקין (70–180): ${(inRange / values.length * 100).toFixed(1)}%
היפר (>180): ${(high / values.length * 100).toFixed(1)}%
היפו (<70): ${(low / values.length * 100).toFixed(1)}%
    `;
  } catch (error) {
    resultBox.textContent = "שגיאה בטעינת הנתונים. בדקי שהכתובת נכונה.";
  }
}
