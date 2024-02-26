// Função para abrir a aba do vendedor ou do cliente
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

// Função para carregar os vendedores na aba do cliente
async function carregarVendedores() {
    try {
        const response = await fetch('/listar_vendedores');
        if (response.ok) {
            const vendedores = await response.json();
            const selectVendedor = document.getElementById("vendedor-atendimento");
            if (!selectVendedor) {
                console.error('Elemento com ID "vendedor-atendimento" não encontrado.');
                return;
            }
            selectVendedor.innerHTML = "";
            if (Array.isArray(vendedores)) {
                vendedores.forEach(vendedor => {
                    const option = document.createElement("option");
                    option.value = vendedor._id;
                    option.textContent = vendedor.nome;
                    selectVendedor.appendChild(option);
                });
            } else {
                throw new Error("Erro ao carregar vendedores: resposta inválida");
            }
        } else {
            throw new Error("Erro ao carregar vendedores: " + response.status + " " + response.statusText);
        }
    } catch (error) {
        console.error('Erro ao carregar vendedores:', error);
        alert('Erro ao carregar vendedores. Verifique o console para mais detalhes.');
    }
}

// Ao carregar a página, inicializa a lista de vendedores na aba do cliente
document.addEventListener("DOMContentLoaded", async function() {
    await carregarVendedores();
});

// Função para cadastrar um vendedor
document.getElementById("form-vendedor").addEventListener("submit", async function(event) {
    event.preventDefault();

    var nome = document.getElementById("nome-vendedor").value;
    var telefone = document.getElementById("telefone-vendedor").value;
    var regiao = document.getElementById("regiao-vendedor").value;
    var observacao = document.getElementById("observacao-vendedor").value;
    var tipoContrato = document.getElementById("tipo-contrato").value;
    var dataInicioContrato = document.getElementById("data-inicio-contrato").value;

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
                observacao: observacao,
                tipoContrato: tipoContrato,
                dataInicioContrato: dataInicioContrato
            })
        });
        
        if (response.ok) {
            const data = await response.json();
            alert(data.message);
            document.getElementById("form-vendedor").reset();
            // Recarregar a lista de vendedores após cadastrar um novo vendedor
            await carregarVendedores();
        } else {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error('Erro ao cadastrar vendedor:', error);
        alert('Erro ao cadastrar vendedor. Verifique o console para mais detalhes.');
    }
});

// Função para cadastrar um cliente
document.getElementById("form-cliente").addEventListener("submit", async function(event) {
    event.preventDefault();

    var razaoSocial = document.getElementById("razao-social").value;
    var nomeFantasia = document.getElementById("nome-fantasia").value;
    var cnpjCpf = document.getElementById("cnpj-cpf").value;
    var endereco = document.getElementById("endereco").value;
    var vendedorAtendimento = document.getElementById("vendedor-atendimento").value;
    var observacaoCliente = document.getElementById("observacao-cliente").value;
    var limiteCredito = document.getElementById("limite-credito").value;
    var tipoRegimeEstadual = document.getElementById("tipo-regime-estadual").value;
    var numeroTelefones = document.getElementById("numero-telefones").value;
    var responsavelCompras = document.getElementById("responsavel-compras").value;
    var responsavelFinanceiro = document.getElementById("responsavel-financeiro").value;
    var responsavelGeral = document.getElementById("responsavel-geral").value;
    var numeroIE = document.getElementById("numero-ie").value;
    var tipoCliente = document.getElementById("tipo-cliente").value;
    var formaPagamento = document.getElementById("forma-pagamento").value;
    var prazoPagamento = document.getElementById("prazo-pagamento").value;
    var modalidadeEntrega = document.getElementById("modalidade-entrega").value;
    var descontoMaximo = document.getElementById("desconto-maximo").value;
    var prazoEntrega = document.getElementById("prazo-entrega").value;
    var responsavelEntrega = document.getElementById("responsavel-entrega").value;
    var tipoIndustriaComercio = document.getElementById("tipo-industria-comercio").value;
    var descricaoProdutosServicos = document.getElementById("descricao-produtos-servicos").value;
    var areaAtuacao = document.getElementById("area-atuacao").value;
    var segmento = document.getElementById("segmento").value;
    var faturamentoAnual = document.getElementById("faturamento-anual").value;

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
                numeroIE: numeroIE,
                tipoCliente: tipoCliente,
                formaPagamento: formaPagamento,
                prazoPagamento: prazoPagamento,
                modalidadeEntrega: modalidadeEntrega,
                descontoMaximo: descontoMaximo,
                prazoEntrega: prazoEntrega,
                responsavelEntrega: responsavelEntrega,
                tipoIndustriaComercio: tipoIndustriaComercio,
                descricaoProdutosServicos: descricaoProdutosServicos,
                areaAtuacao: areaAtuacao,
                segmento: segmento,
                faturamentoAnual: faturamentoAnual
            })
        });
        
        if (response.ok) {
            const data = await response.json();
            alert(data.message);
            document.getElementById("form-cliente").reset();
        } else {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error('Erro ao cadastrar cliente:', error);
        alert('Erro ao cadastrar cliente. Verifique o console para mais detalhes.');
    }
});
