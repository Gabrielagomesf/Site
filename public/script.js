document.addEventListener('DOMContentLoaded', function () {
    var registerSection = document.querySelector('.register-section');
    registerSection.classList.add('hidden');
});

document.getElementById('registerLinkAnchor').addEventListener('click', function (event) {
    event.preventDefault();
    toggleRegister();
});

document.getElementById('registerLink').addEventListener('click', function (event) {
    event.preventDefault();
    toggleRegister();
});

document.getElementById('loginLink').addEventListener('click', function (event) {
    event.preventDefault();
    toggleRegister();
});

document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    login();
});

document.getElementById('registerForm').addEventListener('submit', function (event) {
    event.preventDefault();
    register();
});

async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (data.success) {
            // Mostrar mensagem de login bem-sucedido
            const loginSuccessMessage = document.getElementById('loginSuccess');
            loginSuccessMessage.classList.remove('hidden');

            // Ocultar a mensagem após 2 minutos (120 segundos)
            setTimeout(() => {
                loginSuccessMessage.classList.add('hidden');
            }, 120000);

            // Aguardar 3 segundos antes de redirecionar para a página de perfil
            setTimeout(() => {
                window.location.replace('/perfil.html');
            }, 3000);
        } else {
            const loginError = document.getElementById('loginError');
            loginError.textContent = data.error;
            loginError.classList.remove('hidden');
        }
    } catch (error) {
        console.error('Erro ao enviar solicitação de login:', error);
    }
}

async function register() {
    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const newEmail = document.getElementById('newEmail').value;
    const cargo = document.getElementById('cargo').value;
    const setor = document.getElementById('setor').value;
    const dataNascimento = document.getElementById('dataNascimento').value;

    if (newPassword !== confirmPassword) {
        const registerError = document.getElementById('registerError');
        registerError.textContent = 'As senhas não coincidem.';
        registerError.classList.remove('hidden');
        return;
    }

    try {
        const response = await fetch('/auth/registro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: newUsername, password: newPassword, email: newEmail, cargo, setor, dataNascimento }),
        });

        const data = await response.json();

        if (data.success) {
            window.location.replace('/index.html');
        } else {
            const registerError = document.getElementById('registerError');
            registerError.textContent = data.error;
            registerError.classList.remove('hidden');
        }
    } catch (error) {
        console.error('Erro ao enviar solicitação de registro:', error);
    }
}

function toggleRegister() {
    const registerSection = document.querySelector('.register-section');
    const authSection = document.querySelector('.auth-section');

    registerSection.classList.toggle('hidden');
    authSection.classList.toggle('hidden');
}
