// Função para alternar entre as abas
function openTab(evt, tabName) {
    var tabcontent = document.getElementsByClassName("tabcontent");
    for (var i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    var tablinks = document.getElementsByClassName("tablinks");
    for (var i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }

    document.getElementById(tabName).style.display = "block";
    evt.target.classList.add("active");
}

// Função para buscar clientes
async function buscarClientes() {
    var filter = document.getElementById("search-input-clientes").value.toUpperCase();

    try {
        const response = await fetch('/clientes?q=' + filter);
        if (!response.ok) {
            throw new Error('Erro ao buscar clientes: ' + response.status);
        }
        const data = await response.json();
        var listaClientes = document.getElementById("tabela-clientes").getElementsByTagName('tbody')[0];
        listaClientes.innerHTML = '';

        data.forEach(cliente => {
            var tr = document.createElement("tr");

            var tdCNPJCPF = document.createElement("td");
            tdCNPJCPF.textContent = cliente.cnpjCpf;
            tr.appendChild(tdCNPJCPF);

            var tdRazaoSocial = document.createElement("td");
            tdRazaoSocial.textContent = cliente.razaoSocial;
            tr.appendChild(tdRazaoSocial);

            var tdCodigo = document.createElement("td");
            tdCodigo.textContent = cliente._id;
            tr.appendChild(tdCodigo);

            var tdDataCadastro = document.createElement("td");
            var dataCadastro = new Date(cliente.dataHoraCadastro);
            var dataFormatada = dataCadastro.toLocaleDateString();
            tdDataCadastro.textContent = dataFormatada;
            tr.appendChild(tdDataCadastro);

            listaClientes.appendChild(tr);
        });
    } catch (error) {
        console.error('Erro ao buscar clientes:', error);
        alert('Erro ao buscar clientes. Por favor, tente novamente mais tarde.');
    }
}

// Função para buscar vendedores
async function buscarVendedores() {
    var filter = document.getElementById("search-input-vendedores").value.toUpperCase();

    try {
        const response = await fetch('/vendedores?q=' + filter);
        if (!response.ok) {
            throw new Error('Erro ao buscar vendedores: ' + response.status);
        }
        const data = await response.json();
        var listaVendedores = document.getElementById("tabela-vendedores").getElementsByTagName('tbody')[0];
        listaVendedores.innerHTML = '';

        data.forEach(vendedor => {
            var tr = document.createElement("tr");

            var tdNome = document.createElement("td");
            tdNome.textContent = vendedor.nome;
            tr.appendChild(tdNome);

            var tdTelefone = document.createElement("td");
            tdTelefone.textContent = vendedor.telefone;
            tr.appendChild(tdTelefone);

            var tdRegiao = document.createElement("td");
            tdRegiao.textContent = vendedor.regiao;
            tr.appendChild(tdRegiao);

            var tdCodigo = document.createElement("td");
            tdCodigo.textContent = vendedor._id;
            tr.appendChild(tdCodigo);

            var tdDataCadastro = document.createElement("td");
            var dataCadastro = new Date(vendedor.dataHoraCadastro);
            var dataFormatada = dataCadastro.toLocaleDateString();
            tdDataCadastro.textContent = dataFormatada;
            tr.appendChild(tdDataCadastro);

            listaVendedores.appendChild(tr);
        });
    } catch (error) {
        console.error('Erro ao buscar vendedores:', error);
        alert('Erro ao buscar vendedores. Por favor, tente novamente mais tarde.');
    }
}
// Event listeners para botões de busca
document.getElementById("search-btn-clientes").addEventListener("click", buscarClientes);
document.getElementById("search-input-clientes").addEventListener("keypress", function (e) {
    if (e.key === 'Enter') {
        buscarClientes();
    }
});
document.getElementById("search-btn-vendedores").addEventListener("click", buscarVendedores);
document.getElementById("search-input-vendedores").addEventListener("keypress", function (e) {
    if (e.key === 'Enter') {
        buscarVendedores();
    }
});


// Função para gerar planilha de clientes
function gerarPlanilhaClientes() {
    var tabela = document.getElementById("tabela-clientes");
    var dados = [["CNPJ/CPF", "Razão Social", "Código", "Data de Cadastro"]];

    for (var i = 1; i < tabela.rows.length; i++) {
        var linha = [];
        for (var j = 0; j < tabela.rows[i].cells.length; j++) {
            linha.push(tabela.rows[i].cells[j].innerText);
        }
        dados.push(linha);
    }

    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.aoa_to_sheet(dados);
    XLSX.utils.book_append_sheet(wb, ws, "Clientes");

    XLSX.writeFile(wb, "planilha_clientes.xlsx");
}

// Função para gerar planilha de vendedores
function gerarPlanilhaVendedores() {
    var tabela = document.getElementById("tabela-vendedores");
    var dados = [["Nome", "Telefone", "Região", "Código", "Data de Cadastro"]];

    for (var i = 1; i < tabela.rows.length; i++) {
        var linha = [];
        for (var j = 0; j < tabela.rows[i].cells.length; j++) {
            linha.push(tabela.rows[i].cells[j].innerText);
        }
        dados.push(linha);
    }

    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.aoa_to_sheet(dados);
    XLSX.utils.book_append_sheet(wb, ws, "Vendedores");

    XLSX.writeFile(wb, "planilha_vendedores.xlsx");
}

document.getElementById("btn-sair").addEventListener("click", function() {
    // Exibe uma mensagem de confirmação
    var confirmacao = confirm("Tem certeza de que deseja sair?");

    if (confirmacao) {
        fetch('/auth/logout', {
            method: 'POST'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao fazer logout: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            window.location.href = "/index.html";
        })
        .catch(error => {
            console.error('Erro ao fazer logout:', error);
            alert('Erro ao fazer logout. Por favor, tente novamente mais tarde.');
        });
    }
});

document.getElementById("search-btn-clientes").addEventListener("click", buscarClientes);
document.getElementById("search-input-clientes").addEventListener("keypress", function (e) {
    if (e.key === 'Enter') {
        buscarClientes();
    }
});
document.getElementById("search-btn-vendedores").addEventListener("click", buscarVendedores);
document.getElementById("search-input-vendedores").addEventListener("keypress", function (e) {
    if (e.key === 'Enter') {
        buscarVendedores();
    }
});
document.getElementById("gerar-planilha-clientes").addEventListener("click", gerarPlanilhaClientes);
document.getElementById("gerar-planilha-vendedores").addEventListener("click", gerarPlanilhaVendedores);
