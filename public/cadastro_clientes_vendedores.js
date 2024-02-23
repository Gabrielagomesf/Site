document.addEventListener('DOMContentLoaded', async () => {
    await carregarVendedores();
});

async function carregarVendedores() {
    try {
        const response = await fetch('/vendedores', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (response.ok) {
            const vendedores = await response.json();
            const select = document.getElementById('vendedor-atendimento');
            // Limpar as opções existentes
            select.innerHTML = '';
            // Adicionar uma opção vazia
            const option = document.createElement('option');
            option.value = '';
            option.text = 'Selecione um vendedor';
            select.appendChild(option);
            // Adicionar vendedores como opções
            vendedores.forEach(vendedor => {
                const option = document.createElement('option');
                option.value = vendedor._id;
                option.text = vendedor.nome;
                select.appendChild(option);
            });
        } else {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error('Erro ao carregar vendedores:', error.message);
        alert('Erro ao carregar vendedores. Por favor, tente novamente mais tarde.');
    }
}

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

document.getElementById('btn-sair').addEventListener('click', function() {
    if (confirm('Deseja realmente sair?')) {
        window.location.href = '/index.html';
    }
});

document.getElementById('form-vendedor').addEventListener('submit', async function(event) {
    event.preventDefault();
    const nome = document.getElementById('nome-vendedor').value;
    const telefone = document.getElementById('telefone-vendedor').value;
    const regiao = document.getElementById('regiao-vendedor').value;
    const observacao = document.getElementById('observacao-vendedor').value;
    
    try {
        const response = await fetch('/cadastrar_vendedor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: nome,
                telefone: telefone,
                regiao: regiao,
                observacao: observacao
            })
        });
        
        if (response.ok) {
            const data = await response.json();
            alert(data.message);
            document.getElementById('form-vendedor').reset();
            // Recarregar a lista de vendedores após cadastrar um novo vendedor
            await carregarVendedores();
        } else {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error('Erro ao cadastrar vendedor:', error.message);
        alert('Erro ao cadastrar vendedor. Por favor, tente novamente mais tarde.');
    }
});

document.getElementById('form-cliente').addEventListener('submit', async function(event) {
    event.preventDefault();
    const razaoSocial = document.getElementById('razao-social').value;
    const nomeFantasia = document.getElementById('nome-fantasia').value;
    const cnpjCpf = document.getElementById('cnpj-cpf').value;
    const endereco = document.getElementById('endereco').value;
    const vendedorAtendimento = document.getElementById('vendedor-atendimento').value;
    const observacaoCliente = document.getElementById('observacao-cliente').value;
    const limiteCredito = document.getElementById('limite-credito').value;
    const tipoRegimeEstadual = document.getElementById('tipo-regime-estadual').value;
    const numeroTelefones = document.getElementById('numero-telefones').value;
    const responsavelCompras = document.getElementById('responsavel-compras').value;
    const responsavelFinanceiro = document.getElementById('responsavel-financeiro').value;
    const responsavelGeral = document.getElementById('responsavel-geral').value;
    const numeroIE = document.getElementById('numero-ie').value;
    
    try {
        const response = await fetch('/cadastrar_cliente', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                razaoSocial: razaoSocial,
                nomeFantasia: nomeFantasia,
                cnpjCpf: cnpjCpf,
                endereco: endereco,
                vendedorAtendimento: vendedorAtendimento,
                observacaoCliente: observacaoCliente,
                limiteCredito: limiteCredito,
                tipoRegimeEstadual: tipoRegimeEstadual,
                numeroTelefones: numeroTelefones,
                responsavelCompras: responsavelCompras,
                responsavelFinanceiro: responsavelFinanceiro,
                responsavelGeral: responsavelGeral,
                numeroIE: numeroIE
            })
        });
        
        if (response.ok) {
            const data = await response.json();
            alert(data.message);
            document.getElementById('form-cliente').reset();
        } else {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error('Erro ao cadastrar cliente:', error.message);
        alert('Erro ao cadastrar cliente. Por favor, tente novamente mais tarde.');
    }
});