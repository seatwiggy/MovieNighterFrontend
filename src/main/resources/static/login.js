const ELEMENTS = {
	username: document.getElementById('username'),
	password: document.getElementById('password'),
}

function login() {
	const username = ELEMENTS.username.value;
	const password = ELEMENTS.password.value;
	localStorage.setItem('authHeader', `Basic ${btoa(`${username}:${password}`)}`);
}
