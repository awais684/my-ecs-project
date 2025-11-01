const apiUrl = 'http://ecs-demo-alb-1019953154.eu-central-1.elb.amazonaws.com'; // Replace with actual backend endpoint

let userId = null;
let userEmail = null;

async function signup() {
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;

  const res = await fetch(`${apiUrl}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const text = await res.text();
  document.getElementById('message').innerText = text;
}

async function login() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  const res = await fetch(`${apiUrl}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (data.success) {
    userId = data.user.id;
    userEmail = data.user.email;
    document.getElementById('message').innerText = 'Login successful!';
    document.getElementById('user-email').innerText = userEmail;
    document.getElementById('note-section').style.display = 'block';
  } else {
    document.getElementById('message').innerText = 'Login failed!';
  }
}

async function saveNote() {
  const note = document.getElementById('note').value;
  const res = await fetch(`${apiUrl}/note`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, content: note })
  });

  const text = await res.text();
  document.getElementById('message').innerText = text;
}

async function fetchNotes() {
  const res = await fetch(`${apiUrl}/notes?userId=${userId}`);
  const notes = await res.json();

  const list = document.getElementById('notes-list');
  list.innerHTML = '';
  notes.forEach(note => {
    const li = document.createElement('li');
    li.textContent = note.content;
    list.appendChild(li);
  });
}
