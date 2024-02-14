
// Verifica se o token está nulo
if (localStorage.getItem('token') == null) {
    // Se estiver nulo, alerta o usuário e redireciona para a página inicial
    alert('Você precisa estar logado para acessar esta página.');
    window.location.href = 'inicial.html';
} else {
    // Se o token estiver presente, carrega o usuário logado
    let userOn = JSON.parse(localStorage.getItem('userOn'));
    let logado = document.querySelector('#userOn');
    logado.innerHTML = `Olá ${userOn.usuario}`;
}

// Função para logout
function logout() {
    // Remove o token e o usuário logado do armazenamento local
    localStorage.removeItem('token');
    localStorage.removeItem('userOn');
    // Redireciona para a página de login
    window.location.href = 'login.html';
}