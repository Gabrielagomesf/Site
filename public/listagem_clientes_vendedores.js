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
    evt.currentTarget.classList.add("active");
}

function buscarClientes() {
    var filter = document.getElementById("search-input-clientes").value.toUpperCase();

    fetch('/clientes?q=' + filter)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar clientes: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
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
        })
        .catch(error => {
            console.error('Erro ao buscar clientes:', error);
            alert('Erro ao buscar clientes. Por favor, tente novamente mais tarde.');
        });
}

function buscarVendedores() {
    var filter = document.getElementById("search-input-vendedores").value.toUpperCase();

    fetch('/vendedores?q=' + filter)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar vendedores: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
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
        })
        .catch(error => {
            console.error('Erro ao buscar vendedores:', error);
            alert('Erro ao buscar vendedores. Por favor, tente novamente mais tarde.');
        });
}

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
