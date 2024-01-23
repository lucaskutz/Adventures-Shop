function add() {
    // productName: Obtém o nome do produto da classe CSS .title-production no documento HTML.
    var productName = document.querySelector('.title-production').innerText;
    // productPrice: Obtém o preço do produto da última tag < h4 > dentro da classe CSS.desc, converte-o para um número de ponto flutuante e remove a formatação de moeda(R$) substituindo a vírgula por um ponto.
    var productPrice = parseFloat(document.querySelector('.desc h4:last-child').innerText.replace('R$', '').replace(',', '.'));

    // quantityInput: Obtém o elemento do DOM com o id qtd, que geralmente é um campo de entrada (input) onde o usuário pode inserir a quantidade desejada.
    var quantityInput = document.getElementById('qtd');
    // quantity: Obtém o valor inserido pelo usuário no campo de entrada e converte para um número inteiro.
    var quantity = parseInt(quantityInput.value);

    // Verifica se a quantidade é menor ou igual a zero ou se não é um número. Se sim, exibe um alerta e encerra a função.
    if (quantity <= 0 || isNaN(quantity)) {
        alert('Por favor, insira uma quantidade válida maior que zero.');
        return;
    }

    // Calcula o preço total multiplicando o preço do produto pela quantidade selecionada.
    var totalPrice = productPrice * quantity;

    // Gera um ID único usando o timestamp atual.
    var productId = new Date().getTime();
    // Cria um novo elemento <div> para representar o produto no carrinho.
    var productElement = document.createElement('div');
    // Define a classe e o ID do elemento.
    productElement.className = 'cart-product';
    productElement.id = 'product-' + productId;
    // Preenche o conteúdo HTML do elemento com detalhes do produto, incluindo nome, quantidade, preço e um ícone de lixeira para remover o produto. O ID do produto é passado como argumento para a função removeProduct().
    productElement.innerHTML = '<p><img src="./images/slayer.png" alt="Sword Icon" class="icon-slayer">' + productName + ' - ' + quantity + 'x R$ ' + productPrice.toFixed(2) + ' <ion-icon name="trash-bin-outline" onclick="removeProduct(' + productId + ')"></ion-icon></p>';

    // Adiciona o novo elemento do produto à lista de produtos no carrinho.
    document.getElementById('list-products').appendChild(productElement);

    // Chama a função updateTotalPrice() para atualizar o preço total no carrinho.
    updateTotalPrice(totalPrice);

    // Limpa o campo de entrada de quantidade após adicionar o produto ao carrinho.
    quantityInput.value = '';

    // Obtém a quantidade atual de produtos no carrinho.
    var currentQuantity = parseInt(document.getElementById('cart-quantity').innerText);
    // Calcula a nova quantidade somando a quantidade atual e a quantidade recém-adicionada.
    var newQuantity = currentQuantity + quantity;
    // Atualiza o texto indicando a quantidade de produtos no carrinho.
    document.getElementById('cart-quantity').innerText = newQuantity;
}

function updateTotalPrice(newPrice) {
    // currentTotal: Obtém o elemento do DOM com o id valor-total, que geralmente é um elemento de texto que exibe o preço total atual. Remove a formatação de moeda (R$), converte o valor para um número de ponto flutuante e armazena em currentTotal.
    var currentTotal = parseFloat(document.getElementById('valor-total').innerText.replace('R$', '').replace(',', '.'));

    // updatedTotal: Calcula o novo preço total somando o preço total atual (currentTotal) ao novo preço (newPrice).  
    var updatedTotal = currentTotal + newPrice;

    // Atualiza o texto do elemento com id valor-total no HTML, exibindo o novo preço total formatado como moeda (R$) e com duas casas decimais usando o método toFixed(2).
    document.getElementById('valor-total').innerText = 'R$' + updatedTotal.toFixed(2);
}

function removeProduct(productId) {
    // Usa o ID único do produto (productId) para obter o elemento do DOM associado a esse produto no carrinho.
    var productElement = document.getElementById('product-' + productId);


    // Verifica se o elemento do produto foi encontrado. Se não existir, a função encerra sem fazer mais nada.
    if (productElement) {
        // Utiliza uma expressão regular para extrair a quantidade do texto do elemento do produto.
        var quantity = parseInt(productElement.innerText.match(/\d+/)[0]);
        // Divide o texto do elemento com base na string 'R$' e obtém a parte após 'R$'. Remove espaços em branco e vírgulas e converte para um número de ponto flutuante, obtendo assim o preço do produto.
        var productPrice = parseFloat(productElement.innerText.split('R$')[1].replace(',', '').trim());

        // Remove o elemento do produto da lista do carrinho, utilizando o método removeChild().
        productElement.parentNode.removeChild(productElement);

        // Chama a função updateTotalPrice com um argumento negativo, representando a redução no preço total. Isso é feito multiplicando o preço do produto pelo número de unidades (quantidade) do produto que está sendo removido.
        updateTotalPrice(-productPrice * quantity);
    }
}


function buy() {
    // Obtém o elemento que contém a lista de produtos no carrinho.
    var cartProducts = document.getElementById('list-products');

    // Verifica se o carrinho está vazio, comparando o número de filhos (produtos) no carrinho. Se estiver vazio, exibe um alerta informando ao usuário que o carrinho está vazio e encerra a função.
    if (cartProducts.childNodes.length === 0) {
        // Se o carrinho estiver vazio, exibir mensagem
        alert('O carrinho está vazio. Adicione produtos antes de comprar.');
        return;  // Sair da função se o carrinho estiver vazio
    }

    // Utiliza um loop while para remover todos os filhos do elemento cartProducts (ou seja, todos os produtos no carrinho). Isso limpa o carrinho, removendo todos os elementos de produto.
    while (cartProducts.firstChild) {
        cartProducts.removeChild(cartProducts.firstChild);
    }

    // Define o texto do elemento que exibe o preço total no carrinho como 'R$00,00', indicando que o carrinho está vazio.
    document.getElementById('valor-total').innerText = 'R$00,00';

    // Exibe um alerta informando ao usuário que a compra foi realizada com sucesso.
    alert('Compra realizada com sucesso! Obrigado por comprar na Adventure Shop.');
}