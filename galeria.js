document.addEventListener("DOMContentLoaded", function() {
    const inputImagem = document.getElementById("inputImagem");
    const botaoAdicionar = document.getElementById("botaoAdicionar");
    const containerImagens = document.getElementById("containerImagens");

    // Função para adicionar imagem
    function adicionarImagem(imagemData) {
        const img = document.createElement("img");
        img.src = imagemData.url;
        img.alt = imagemData.nome;

        // Associar evento de clique para remover a imagem
        img.addEventListener("click", function() {
            containerImagens.removeChild(img);
            // Atualizar o localStorage removendo a imagem
            const imagens = JSON.parse(localStorage.getItem("imagens")) || [];
            const novaLista = imagens.filter(imagem => imagem.nome !== imagemData.nome);
            localStorage.setItem("imagens", JSON.stringify(novaLista));
        });

        containerImagens.appendChild(img);
    }

    // Verificar se há imagens armazenadas no localStorage ao carregar a página
    const imagensSalvas = JSON.parse(localStorage.getItem("imagens")) || [];
    imagensSalvas.forEach(adicionarImagem);

    // Adicionar imagem ao clicar no botão
    botaoAdicionar.addEventListener("click", function() {
        const file = inputImagem.files[0];
        const reader = new FileReader();

        reader.onload = function(event) {
            const imagemData = {
                nome: file.name,
                url: event.target.result
            };
            adicionarImagem(imagemData);
            // Armazenar informações da imagem no localStorage
            const imagens = JSON.parse(localStorage.getItem("imagens")) || [];
            imagens.push(imagemData);
            localStorage.setItem("imagens", JSON.stringify(imagens));
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    });
});
