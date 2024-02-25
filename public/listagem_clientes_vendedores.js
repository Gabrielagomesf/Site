// Função para alternar entre abas
function openTab(evt, tabName) {
    // Oculta todos os elementos com a classe "tabcontent" e remove a classe "active" dos botões das abas
    var tabcontent = document.getElementsByClassName("tabcontent");
    for (var i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    var tablinks = document.getElementsByClassName("tablinks");
    for (var i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }

    // Exibe o conteúdo da aba atual e adiciona a classe "active" ao botão da aba
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.classList.add("active");
}

// Função para buscar clientes
function buscarClientes() {
    var filter = document.getElementById("search-input-clientes").value.toUpperCase();

    // Requisição GET para buscar dados de clientes
    fetch('/clientes?q=' + filter)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar clientes: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            // Limpar a lista antes de adicionar os novos itens
            var listaClientes = document.getElementById("lista-clientes");
            listaClientes.innerHTML = '';

            // Adicionar os novos itens à lista de clientes
            data.forEach(cliente => {
                var li = document.createElement("li");
                var a = document.createElement("a");
                a.textContent = cliente.nome || cliente.razaoSocial;
                a.href = '#'; // Coloque o link adequado se necessário
                li.appendChild(a);
                listaClientes.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Erro ao buscar clientes:', error);
            alert('Erro ao buscar clientes. Por favor, tente novamente mais tarde.');
        });
}

// Função para buscar vendedores
function buscarVendedores() {
    var filter = document.getElementById("search-input-vendedores").value.toUpperCase();

    // Requisição GET para buscar dados de vendedores
    fetch('/vendedores?q=' + filter)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar vendedores: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            // Limpar a lista antes de adicionar os novos itens
            var listaVendedores = document.getElementById("lista-vendedores");
            listaVendedores.innerHTML = '';

            // Adicionar os novos itens à lista de vendedores
            data.forEach(vendedor => {
                var li = document.createElement("li");
                var a = document.createElement("a");
                a.textContent = vendedor.nome;
                a.href = '#'; // Coloque o link adequado se necessário
                li.appendChild(a);
                listaVendedores.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Erro ao buscar vendedores:', error);
            alert('Erro ao buscar vendedores. Por favor, tente novamente mais tarde.');
        });
}

// Função para gerar relatório de clientes em Excel
function gerarRelatorioClientes() {
    fetch('/clientes')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar clientes: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            var workbook = XLSX.utils.book_new();
            var clientesSheet = XLSX.utils.json_to_sheet(data);
            XLSX.utils.book_append_sheet(workbook, clientesSheet, "Clientes");

            // Gerar o arquivo Excel
            XLSX.writeFile(workbook, "relatorio_clientes.xlsx");
        })
        .catch(error => {
            console.error('Erro ao gerar relatório de clientes:', error);
            alert('Erro ao gerar relatório de clientes. Por favor, tente novamente mais tarde.');
        });
}

// Função para gerar relatório de vendedores em Excel
function gerarRelatorioVendedores() {
    fetch('/vendedores')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar vendedores: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            var workbook = XLSX.utils.book_new();
            var vendedoresSheet = XLSX.utils.json_to_sheet(data);
            XLSX.utils.book_append_sheet(workbook, vendedoresSheet, "Vendedores");

            // Gerar o arquivo Excel
            XLSX.writeFile(workbook, "relatorio_vendedores.xlsx");
        })
        .catch(error => {
            console.error('Erro ao gerar relatório de vendedores:', error);
            alert('Erro ao gerar relatório de vendedores. Por favor, tente novamente mais tarde.');
        });
}

// Adiciona event listener para a barra de pesquisa dos clientes
document.getElementById("search-btn-clientes").addEventListener("click", buscarClientes);

// Adiciona event listener para a barra de pesquisa dos vendedores
document.getElementById("search-btn-vendedores").addEventListener("click", buscarVendedores);

// Adiciona event listener para o botão de gerar relatório de clientes
document.getElementById("gerar-planilha-clientes").addEventListener("click", gerarRelatorioClientes);

// Adiciona event listener para o botão de gerar relatório de vendedores
document.getElementById("gerar-planilha-vendedores").addEventListener("click", gerarRelatorioVendedores);
