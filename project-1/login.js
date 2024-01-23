const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');



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




