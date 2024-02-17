document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/usuario');
        const userData = await response.json();
        
        if (userData) {
            document.getElementById('nome-usuario').textContent = userData.username;
            document.getElementById('email').textContent = userData.email;
            document.getElementById('cargo').textContent = userData.cargo;
            document.getElementById('setor').textContent = userData.setor;
            
            // Convertendo a data de nascimento para o fuso horário local
            const dataNascimento = new Date(userData.dataNascimento);
            dataNascimento.setMinutes(dataNascimento.getMinutes() + dataNascimento.getTimezoneOffset());
            
            // Formatando a data de nascimento para exibição
            const formattedDataNascimento = dataNascimento.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            });
            
            document.getElementById('data-nascimento').textContent = formattedDataNascimento;
        }
    } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
    }
});

document.getElementById('btn-sair').addEventListener('click', function() {
    if (confirm('Deseja realmente sair?')) {
        window.location.href = '/index.html';
    }
});
