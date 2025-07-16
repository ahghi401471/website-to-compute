const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// מאפשר טעינת קבצים מתיקיית public
app.use(express.static('public'));

// מאפשר קריאת JSON מבקשות POST
app.use(express.json());

// API לקבלת רשימת המשתמשים המאושרים
app.get('/api/users', (req, res) => {
  const usersFile = path.join(__dirname, 'public', 'users.json');
  const users = JSON.parse(fs.readFileSync(usersFile, 'utf8'));
  const approvedUsers = users.filter(user => user.approved);
  res.json(approvedUsers);
});

// התחלת השרת
app.listen(PORT, () => {
  console.log(`השרת רץ בכתובת http://localhost:${PORT}`);
});
