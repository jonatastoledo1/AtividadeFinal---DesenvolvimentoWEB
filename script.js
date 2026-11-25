// Seleção dos elementos HTML
const formulario = document.getElementById("formulario-contato");
const campoNome = document.getElementById("nome");
const campoEmail = document.getElementById("email");
const campoAssunto = document.getElementById("assunto");
const campoMensagem = document.getElementById("mensagem");
const retorno = document.getElementById("retorno-formulario");
const contador = document.getElementById("contador");
const linkEmail = document.getElementById("link-email");

// Função para atualizar o contador de caracteres
function atualizarContador() {
  const quantidade = campoMensagem.value.length;
  contador.textContent = quantidade + " / 500 caracteres";
}

// Função para exibir mensagens na tela
function exibirRetorno(texto, tipo) {
  retorno.textContent = texto;
  retorno.className = "retorno-formulario " + tipo;
}

// Função para validar o formulário
function validarFormulario(evento) {
  evento.preventDefault();
  const nome = campoNome.value.trim();
  const email = campoEmail.value.trim();
  const assunto = campoAssunto.value;
  const mensagem = campoMensagem.value.trim();

  // Validação dos campos vazios
  if (nome === "" || email === "" || assunto === "" || mensagem === "") {
    exibirRetorno("Por favor, preencha todos os campos.", "erro");
    return;
  }

  // Validação do e-mail
  if (!campoEmail.validity.valid) {
    exibirRetorno("Por favor, informe um e-mail válido.", "erro");
    return;
  }

  // Validação do tamanho da mensagem
  if (mensagem.length < 10) {
    exibirRetorno("A mensagem deve possuir pelo menos 10 caracteres.", "erro");
    return;
  }

  // Recuperação do e-mail de destino
  const destinatario = linkEmail.getAttribute("href").replace("mailto:", "");
  if (destinatario === "jonatas.toledo@edu.unifil.br") {
    exibirRetorno("O e-mail de destino ainda precisa ser configurado.", "erro");
    return;
  }

  // Preparação da mensagem
  const corpoEmail =
    "Nome: " + nome + "\nE-mail: " + email + "\n\nMensagem:\n" + mensagem;
  const enderecoEmail =
    "mailto:" +
    destinatario +
    "?subject=" +
    encodeURIComponent(assunto) +
    "&body=" +
    encodeURIComponent(corpoEmail);

  // Exibição do retorno
  exibirRetorno(
    "Mensagem preparada, " +
      nome +
      "! Confirme o envio no seu aplicativo de e-mail.",
    "sucesso",
  );

  // Abertura do aplicativo de e-mail
  window.location.href = enderecoEmail;
}

// Eventos
if (formulario) {
  formulario.addEventListener("submit", validarFormulario);
  campoMensagem.addEventListener("input", atualizarContador);
  atualizarContador();
}
