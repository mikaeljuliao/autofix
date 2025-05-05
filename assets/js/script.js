'use strict';



/**
 * MOBILE NAVBAR TOGGLE
 */

const navbar = document.querySelector("[data-navbar]");
const navToggler = document.querySelector("[data-nav-toggler]");

navToggler.addEventListener("click", function () {
  navbar.classList.toggle("active");
  this.classList.toggle("active");
});


 // Seleciona todas as estrelas do sistema de avaliação
 const stars = document.querySelectorAll(".star"); // O querySelectorAll retorna uma lista de todas as estrelas (elementos com a classe 'star')

 /* Seleciona a caixa de comentário e os botões de envio e reset */
 const comentarioBox = document.getElementById("comentario"); // Seleciona a área de comentário (caixa de texto)
 const botoes = document.getElementById("botoes"); // Seleciona a área dos botões de enviar e resetar
 
 // Botões de interação com o feedback
 const enviarBtn = document.getElementById("enviar"); // Botão de "Enviar Feedback"
 const resetBtn = document.getElementById("resetar"); // Botão de "Resetar Avaliação"
 
 // Mensagem que aparecerá após o feedback ser enviado
 const msg = document.getElementById("feedback-msg"); // Div onde será exibido o feedback após o envio
 
 // Definindo as mensagens que aparecerão com base na nota escolhida
 const mensagens = {
   1: { texto: "Sentimos muito pela sua experiência. Vamos melhorar!", emoji: "⚠️" }, // Se o usuário der 1 estrela
   2: { texto: "Agradecemos seu retorno. Nossa equipe já está atenta.", emoji: "🔧" }, // Se o usuário der 2 estrelas
   3: { texto: "Obrigado! Estamos buscando evoluir sempre.", emoji: "✅" }, // Se o usuário der 3 estrelas
   4: { texto: "Ficamos felizes com seu retorno positivo!", emoji: "👍" }, // Se o usuário der 4 estrelas
   5: { texto: "Excelente! Obrigado por confiar no nosso trabalho!", emoji: "⭐" } // Se o usuário der 5 estrelas
 };
 
 let notaSelecionada = 0; // Variável que armazena a nota escolhida pelo usuário, inicialmente 0 (nenhuma nota selecionada)
 
 // Laço que percorre todas as estrelas e adiciona o comportamento de clique
 stars.forEach(star => {
   // A cada clique numa estrela, marca a estrela como selecionada
   star.addEventListener("click", () => {
     // star.dataset.value pega o valor da estrela clicada, que é armazenado no atributo data-value (1, 2, 3, etc.)
     notaSelecionada = parseInt(star.dataset.value); // Converte o valor para inteiro
 
     // Laço for para atualizar o estilo das estrelas, mostrando as estrelas selecionadas
     stars.forEach(s => s.classList.remove("selected")); // Remove a classe 'selected' de todas as estrelas, ou seja, reseta as estrelas
 
     // Adiciona a classe 'selected' nas estrelas que foram clicadas
     for (let i = 0; i < notaSelecionada; i++) { // Laço for percorre até o valor da nota
       stars[i].classList.add("selected"); // Marca a estrela como 'selected' (amarela)
     }
 
     // Exibe a caixa de comentário e os botões de "Enviar" e "Refazer"
     comentarioBox.style.display = "block"; // Torna a caixa de comentário visível
     botoes.style.display = "flex"; // Torna os botões visíveis
   });
 });
 
 // Função de envio do feedback
 enviarBtn.addEventListener("click", () => {
   // Pega o valor do comentário que o usuário digitou
   const texto = document.getElementById("mensagem").value; // Acessa o conteúdo da caixa de comentário (campo de texto)
 
   // Cria um objeto com os dados do feedback (nota e comentário)
   const feedback = {
     nota: notaSelecionada, // A nota que o usuário escolheu
     comentario: texto // O comentário que o usuário deixou
   };
 
   // Salva o feedback no LocalStorage do navegador (armazena dados localmente)
   localStorage.setItem("feedbackOficina", JSON.stringify(feedback)); // JSON.stringify converte o objeto para uma string para ser armazenado
 
   // Exibe a mensagem de feedback, dependendo da nota escolhida
   const info = mensagens[notaSelecionada]; // Pega a mensagem correspondente à nota selecionada
   msg.innerHTML = `<p>${info.texto}</p><div class="emoji">${info.emoji}</div>;` // Exibe a mensagem e o emoji
 
   msg.style.opacity = 1; // Torna a mensagem visível, com transição de opacidade
 });
 
 // Função de resetar a avaliação
 resetBtn.addEventListener("click", () => {
   notaSelecionada = 0; // Reseta a nota para 0 (nenhuma estrela selecionada)
   localStorage.removeItem("feedbackOficina"); // Remove o feedback salvo no LocalStorage
   document.getElementById("mensagem").value = ""; // Limpa o campo de comentário
 
   msg.innerHTML = ""; // Limpa a mensagem de feedback
   msg.style.opacity = 0; // Torna a mensagem invisível
 
   // Esconde a caixa de comentário e os botões novamente
   comentarioBox.style.display = "none"; 
   botoes.style.display = "none";
 
   // Remove a seleção das estrelas
   stars.forEach(s => s.classList.remove("selected"));
 });
 
 // Carrega o feedback salvo no LocalStorage (se houver um feedback armazenado)
 const salvo = localStorage.getItem("feedbackOficina"); // Pega o item "feedbackOficina" do LocalStorage
 if (salvo) { // Se houver um feedback salvo
   const dados = JSON.parse(salvo); // Converte o feedback de volta para objeto
   notaSelecionada = dados.nota; // Atribui a nota salva
   document.getElementById("mensagem").value = dados.comentario; // Exibe o comentário salvo
 
   // Marca as estrelas de acordo com a nota salva
   for (let i = 0; i < notaSelecionada; i++) { // Laço for que percorre as estrelas até o número da nota
     stars[i].classList.add("selected"); // Marca as estrelas de 1 até a nota escolhida
   }
 
   // Exibe a caixa de comentário e os botões
   comentarioBox.style.display = "block"; // Torna a caixa de comentário visível
   botoes.style.display = "flex"; // Torna os botões visíveis
 
   // Exibe a mensagem de feedback com base na nota salva
   const info = mensagens[notaSelecionada]; // Pega as informações da nota salva
   msg.innerHTML = `<p>${info.texto}</p><div class="emoji">${info.emoji}</div>; // Exibe a mensagem e emoji
   msg.style.opacity = 1;` // Torna a mensagem visível
 }
 
