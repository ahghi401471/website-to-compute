let users = [];

async function loadUsers() {
  const res = await fetch('users.json');
  users = await res.json();
  renderUsers();
}

function renderUsers() {
  const table = document.getElementById('usersTable');
  table.innerHTML = '';
  users.forEach((u, i) => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${u.username}</td>
      <td>${u.approved ? '✅' : '❌'}</td>
      <td>
        <button onclick="toggleApproval(${i})">${u.approved ? 'בטל אישור' : 'אשר'}</button>
        <button onclick="deleteUser(${i})">🗑️ מחק</button>
      </td>
    `;
    table.appendChild(row);
  });
}

function toggleApproval(index) {
  users[index].approved = !users[index].approved;
  saveUsers();
}

function deleteUser(index) {
  users.splice(index, 1);
  saveUsers();
}

function addUser() {
  const username = document.getElementById('newUser').value;
  const password = document.getElementById('newPass').value;
  if (!username || !password) return alert("מלא את כל השדות");
  users.push({ username, password, approved: false });
  saveUsers();
}

function saveUsers() {
  fetch('/save-users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(users)
  }).then(() => {
    renderUsers();
  }).catch(() => alert('נדרש שרת כדי לשמור נתונים'));
}

loadUsers();
