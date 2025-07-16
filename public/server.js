const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.static('public'));
app.use(express.json());

app.post('/save-users', (req, res) => {
  fs.writeFileSync('public/users.json', JSON.stringify(req.body, null, 2));
  res.send({ status: 'ok' });
});

app.listen(3000, () => console.log('שרת פועל על פורט 3000'));
