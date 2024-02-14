const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');

const msgErrorRegister = document.querySelector('#msgErrorRegister')
const msgSucessRegister = document.querySelector('#msgSucessRegister')

const msgError = document.querySelector('#msgError')
const msgSucess = document.querySelector('#msgSucess')

const email = document.querySelector('#email')
const labelEmail = document.querySelector('#label-email')
let validEmail = false;

const usuario = document.querySelector('#usuario')
const labelUsuario = document.querySelector('#label-usuario')
let validUsuario = false;

const senha = document.querySelector('#senha')
const labelSenha = document.querySelector('#label-senha')
let validSenha = false;


const confirmSenha = document.querySelector('#confirmSenha')
const labelConfirmSenha = document.querySelector('#label-confirmSenha')
let validConfirmSenha = false;

usuario.addEventListener('keyup', () => {
    if (usuario.value.length <= 4) {
        labelUsuario.setAttribute('style', 'color: red');
        labelUsuario.innerHTML = 'Usuário - Insira no mínimo 5 caracteres';
        validUsuario = false;

    } else {
        labelUsuario.setAttribute('style', 'color: white');
        labelUsuario.innerHTML = 'Usuário';
        validUsuario = true;

    }
})


email.addEventListener('keyup', () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.value.match(emailRegex)) {
        labelEmail.setAttribute('style', 'color: white');
        labelEmail.innerHTML = 'Email';
        validEmail = true;
    } else {
        labelEmail.setAttribute('style', 'color: red');
        labelEmail.innerHTML = 'Email - Insira um email válido';
        validEmail = false;
    }
});

senha.addEventListener('keyup', () => {
    if (senha.value.length <= 5) {
        labelSenha.setAttribute('style', 'color: red');
        labelSenha.innerHTML = 'Senha - Insira no mínimo 6 caracteres';
        validSenha = false;

    } else {
        labelSenha.setAttribute('style', 'color: white');
        labelSenha.innerHTML = 'Senha';
        validSenha = true;

    }
})

confirmSenha.addEventListener('keyup', () => {
    if (senha.value != confirmSenha.value) {
        labelConfirmSenha.setAttribute('style', 'color: red');
        labelConfirmSenha.innerHTML = 'Confirmar Senha - As senhas não conferem';
        validConfirmSenha = false;

    } else {
        labelConfirmSenha.setAttribute('style', 'color: white');
        labelConfirmSenha.innerHTML = 'Confirmar Senha';
        validConfirmSenha = true;

    }
})

function register() {
    if (validUsuario && validSenha && validConfirmSenha && validEmail) {
        let listUser = JSON.parse(localStorage.getItem('listUser') || '[]');

        const usuarioExistente = listUser.find(user => user.usuarioCad === usuario.value);
        const emailExistente = listUser.find(user => user.emailCad === email.value);

        if (usuarioExistente) {
            msgErrorRegister.setAttribute('style', 'display: block');
            msgErrorRegister.innerHTML = 'Nome de usuário já está em uso.';
            msgSucessRegister.innerHTML = '';
            msgSucessRegister.setAttribute('style', 'display: none');
            return; // Interrompe o cadastro
        }

        if (emailExistente) {
            msgErrorRegister.setAttribute('style', 'display: block');
            msgErrorRegister.innerHTML = 'Este e-mail já está em uso. Por favor, insira outro e-mail.';
            msgSucessRegister.innerHTML = '';
            msgSucessRegister.setAttribute('style', 'display: none');
            email.value = ''; // Limpa o campo de e-mail
            return;
        }

        const termsCheckbox = document.querySelector('#terms-checkbox');
        if (!termsCheckbox.checked) {
            msgErrorRegister.setAttribute('style', 'display: block');
            msgErrorRegister.innerHTML = 'Você precisa aceitar os termos e condições antes de prosseguir.';
            msgSucessRegister.innerHTML = '';
            msgSucessRegister.setAttribute('style', 'display: none');
            return; // Interrompe o cadastro
        }


        listUser.push(
            {
                usuarioCad: usuario.value,
                senhaCad: senha.value,
                emailCad: email.value
            }
        )

        localStorage.setItem('listUser', JSON.stringify(listUser))


        msgSucessRegister.setAttribute('style', 'display: block');
        msgSucessRegister.innerHTML = 'Cadastro realizado com sucesso!';
        msgErrorRegister.setAttribute('style', 'display: none');
        msgErrorRegister.innerHTML = '';

        setTimeout(() => {
            document.querySelector('.login-link').click();
        }, 1500);

        usuario.value = '';
        email.value = '';
        senha.value = '';
        confirmSenha.value = '';



    } else {
        msgError.setAttribute('style', 'display: block');
        msgError.innerHTML = 'Preencha todos os campos corretamente antes de cadastrar';
        msgSucess.innerHTML = '';
        msgSucess.setAttribute('style', 'display: none');
    }


}




document.addEventListener("DOMContentLoaded", function () {
    var loginBtn = document.getElementById("loginBtn");
    var containerMessage = document.getElementById("container-message");

    // Adiciona um ouvinte de eventos ao botão de login
    loginBtn.addEventListener("click", function () {
        // Desabilita o botão após o clique
        loginBtn.disabled = true;

        // Remove o elemento "container-message"
        if (containerMessage) {
            containerMessage.remove();
        }
    });
});

registerLink.addEventListener('click', () => {
    wrapper.classList.add('active');
});



loginLink.addEventListener('click', () => {
    wrapper.classList.remove('active');
});

btnPopup.addEventListener('click', () => {
    wrapper.classList.add('active-popup');
});


////////////////////////


btn.addEventListener('click', () => {
    let inputSenha = document.querySelector('#senha');

    if (inputSenha.getAttribute('type') == 'password') {
        inputSenha.setAttribute('type', 'text');
    } else {
        inputSenha.setAttribute('type', 'password');
    }
});


function login() {

    let email = document.querySelector('#email-login')
    let emailLabel = document.querySelector('#emailLabel')

    let senha = document.querySelector('#senha-login');
    let senhaLabel = document.querySelector('#senhaLabel')

    let msgError = document.querySelector('#msgError')

    let listUser = [];

    let loginValid = {
        email: '',
        senha: '',
        usuario: ''
    }

    listUser = JSON.parse(localStorage.getItem('listUser'))

    if (!email.value.trim()) {
        msgError.setAttribute('style', 'display: block');
        msgError.innerHTML = 'Por favor, insira seu e-mail.';
        email.focus();
        return;
    }

    listUser.forEach((item) => {
        if (email.value == item.emailCad && senha.value == item.senhaCad) {
            loginValid = {
                usuario: item.usuarioCad,
                email: item.emailCad,
                senha: item.senhaCad
            }
        }
    });


    if (email.value == loginValid.email && senha.value == loginValid.senha) {
        msgError.innerHTML = '';
        msgSucess.setAttribute('style', 'display: block');
        msgSucess.innerHTML = 'Login efetuado com sucesso!';
        window.location.href = 'perfil.html';

        let token = Math.random().toString(16).substring(2);
        localStorage.setItem('token', token);

        localStorage.setItem('userOn', JSON.stringify(loginValid));
    } else {
        emailLabel.setAttribute('style', 'color: red');
        email.setAttribute('style', 'border-color: red');
        senhaLabel.setAttribute('style', 'color: red');
        senha.setAttribute('style', 'border-color: red');
        msgError.setAttribute('style', 'display: block');
        msgError.innerHTML = 'Email ou senha incorretos!';
        email.focus();
    }
}



