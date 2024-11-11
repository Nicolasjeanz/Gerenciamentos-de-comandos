let spanRemovido = null;

class Pedido {
        constructor(id, produto, quantidade, status ='Pendente') {
        this.id = id;
        this.produto = produto
        this.quantidade = quantidade;
        this.status = status
    }
}

class Restaurante {
    constructor() {
        this.pedidos = [];
        this.idAtual = 1;
    }

    adicionarPedido(produto, quantidade) {
        const pedido = new Pedido(this.idAtual++, produto, quantidade);
        this.pedidos.push(pedido);
        this.montarElementoProduto();
    }
    montarElementoProduto() {
        const listaPedidos = document.getElementById("lista-pedidos");
        listaPedidos.innerHTML= "";

        this.pedidos.forEach((pedido) => {
            const li = document.createElement("li");
            li.innerHTML = `
            <p><strong>ID:</strong> ${pedido.id}</p>
            <p><strong>Produtos:</strong> ${pedido.produto}</p>
            <p><strong>Quantidade:</strong> ${pedido.quantidade}</p>
            <p><strong>Status:</strong> ${pedido.status}</p>
            <div class="acoes-pedidos">
                <button class="btn-atualizar">Em preparo</button>
                <button class="btn-atualizar">Finalizado</button>
                <button class="btn-remover">Remover</button>
            </div>
            `;
            listaPedidos.appendChild(li);
        })
    }
}

const restaurante = new Restaurante();

function adicionarpedido() {
    const produto = document.getElementById("produto").value;
    const quantidade = document.getElementById("quantidade").value;

    if(produto && quantidade) {
        restaurante.adicionarPedido(produto, quantidade); 
        document.getElementById("produto").value = "";
    document.getElementById("quantidade").value = "";

        atualizarMensagem()
    } else {
            alert('Por favor,preencha todos os campos.')
    
    }
}
function atualizarMensagem() {
    const lista = document.getElementById("lista-pedidos");

    if(lista.children.length === 0) {
        if (spanRemovido) {
            document.querySelector(".lista-pedidos").insertBefore(
                spanRemovido, document.querySelector(
                    ".lista-pedidos").firstChild);
                spanRemovido = null;
            
        }
    } else {
        let mensagemNaoExiste = document.getElementById("nao-existe")
        if(mensagemNaoExiste) {
            spanRemovido = mensagemNaoExiste;
            mensagemNaoExiste.remove();
        }
    }
}