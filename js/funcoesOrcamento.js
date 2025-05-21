// Mostrar campo de empresa apenas se o tipo de cliente for "empresa"
document.getElementById('tipoCliente').addEventListener('change', function() {
    const empresaGroup = document.getElementById('empresaGroup');
    if (this.value === 'empresa') {
        empresaGroup.style.display = 'block';
    } else {
        empresaGroup.style.display = 'none';
        document.getElementById('empresa').value = ''; // Limpa o campo empresa se não for necessário
    }
});

// Manipular o envio do formulário
document.getElementById('orcamentoForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const tipoCliente = document.getElementById('tipoCliente').value;
    const empresa = document.getElementById('empresa').value || 'N/A';
    const descricao = document.getElementById('descricao').value;
    const contato = document.getElementById('contato').value;

    if (contato === 'email') {
        // Enviar via email utilizando mailto:
        const mailtoLink = `mailto:madeirasvillafaria@gmail.com.com?subject=Solicitação de Orçamento&body=Nome: ${nome}%0AEmail: ${email}%0ATipo de Cliente: ${tipoCliente}%0AEmpresa: ${empresa}%0ADescrição: ${descricao}`;
        window.location.href = mailtoLink;
    } else if (contato === 'whatsapp') {
        // Enviar via WhatsApp
        const whatsappNumber = '47991448075'; // Número do WhatsApp da madeireira
        const whatsappMessage = `https://api.whatsapp.com/send?phone=55${whatsappNumber}&text=Solicitação de Orçamento%0ANome: ${nome}%0AEmail: ${email}%0ATipo de Cliente: ${tipoCliente}%0AEmpresa: ${empresa}%0ADescrição: ${descricao}`;
        window.open(whatsappMessage, '_blank');
    }
});

// Função para enviar o orçamento por WhatsApp
function enviarPorWhatsApp(nome, tipoCliente, empresa, descricao) {
    const numeroWhatsApp = '47991448075'; // Substitua pelo número do WhatsApp da madeireira
    let mensagem = `Olá, meu nome é ${nome}. Gostaria de solicitar um orçamento. \n\nTipo de Cliente: ${tipoCliente === 'empresa' ? 'Empresa: ' + empresa : 'Pessoa Física'}\nDescrição: ${descricao}`;
    const url = `https://api.whatsapp.com/send?phone=${47991448075}&text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
}
