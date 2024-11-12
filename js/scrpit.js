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
        this.atualizarStorage();
        this.montarElementoProduto();
    }

    atualizarPedido(id,status) {
        const pedido = this.pedidos.find(pedido => pedido.id === id);
        if (pedido) {
            pedido.status = status;
            this.atualizarStorage();
            this.montarElementoProduto();
        }
    }

    removerpedido(id) {
        const index = this.pedidos.findIndex(pedido => pedido.id === id);
        if(index != -1) {
            this.pedidos.splice(index, 1);
            this.atualizarStorage();
            this.montarElementoProduto()
        }
    }

    atualizarStorage() {
        localStorage.setItem("@pedidos", JSON.stringify(this.pedidos))
    }
    buscarStorage() {
        const storagePedidos = localStorage.getItem("@pedidos");
        if(storagePedidos) {
            this.pedidos = JSON.parse(storagePedidos);
            this.montarElementoProduto();
        }
    }

    montarElementoProduto() {
        const listaPedidos = document.getElementById("lista-pedidos");
        listaPedidos.innerHTML = "";

        this.pedidos.forEach((pedido) => {
            const li = document.createElement("li");
            li.innerHTML = `
            <p><strong>ID:</strong> ${pedido.id}</p>
            <p><strong>Produtos:</strong> ${pedido.produto}</p>
            <p><strong>Quantidade:</strong> ${pedido.quantidade}</p>
            <p><strong>Status:</strong> ${pedido.status}</p>
            <div class="acoes-pedidos">
                <button class="btn-atualizar" onclick="atualizarStatus(${pedido.id},'em preparo')">Em preparo</button>
                <button class="btn-atualizar" onclick="atualizarStatus(${pedido.id},'finalizado')">Finalizado</button>
                <button class="btn-remover" onclick="removerpedido(${pedido.id})">Remover</button>
            </div>
            `;
            listaPedidos.appendChild(li);
        })
    }
}

const restaurante = new Restaurante();

function iniciarDados(){
    restaurante.buscarStorage()

    const lista = document.getElementById("lista-pedidos");
    this.montarElementonaoExiste(lista);
}

function adicionarpedido() {
    const produto = document.getElementById("produto").value;
    const quantidade = document.getElementById("quantidade").value;

    if(produto && quantidade) {
        restaurante.adicionarPedido(produto, quantidade); 
        document.getElementById("produto").value = "";
    document.getElementById("quantidade").value = "";

        atualizarMensagem()
    } else {
            alert('Por favor,preencha todos os campos.');
    
    }
}

function atualizarStatus(id,status) {
    restaurante.atualizarPedido(id,status);
}
function removerpedido(id) {
    restaurante.removerpedido(id);
    this.atualizarMensagem();
}
function atualizarMensagem() {
    const lista = document.getElementById("lista-pedidos");
    const mensagemNaoExiste = document.getElementById("nao-existe");

    if(lista.children.length === 0) {
        this.montarElementonaoExiste(lista);
    } else {
        if(mensagemNaoExiste) {
            mensagemNaoExiste.remove();
        }
    }
}
function montarElementonaoExiste(lista) {
    let mensagemNaoExiste = document.getElementById("nao-existe");
    if (!mensagemNaoExiste && lista.children.length === 0) {
        const li = document.createElement("li");
        const mensagem = document.createElement("span");
        mensagem.id = "não existe";
        mensagem.textContent = "Não existe Pedidos!"
        li.appendChild(mensagem)
        lista.appendChild(li)
    }
}

this.iniciarDados()