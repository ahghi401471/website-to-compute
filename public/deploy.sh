#!/bin/bash

echo "🚀 מתקין תלויות..."
npm install

echo "📁 בודק קבצים..."
if [ ! -f users.json ]; then
  echo "{}" > users.json
  echo "✅ נוצר קובץ users.json ריק"
fi

echo "🟢 מריץ את השרת עם PM2..."
npm install -g pm2
pm2 delete all
pm2 start index.js --name diabetes-bot

echo "🌐 הגדרת nginx (אם צריך) – נא להוסיף ידנית או לבקש שאכין לך"
echo "🏁 סיום. האתר אמור לרוץ כעת על פורט 3000 (http://IP:3000)"
