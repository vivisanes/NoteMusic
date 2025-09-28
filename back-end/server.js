const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

let musicas = []; // Um array para armazenar as músicas temporariamente

// Middleware para servir arquivos estáticos e processar formulários
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Rota para verificar se a música já foi cadastrada
app.post('/verificar', (req, res) => {
    const { nome, album, artista, genero } = req.body;

    // Verifica se a música já está cadastrada
    const musicaExistente = musicas.find(musica =>
        musica.nome === nome && musica.album === album && musica.artista === artista && musica.genero === genero
    );

    if (musicaExistente) {
        res.send('true'); // Música já cadastrada
    } else {
        res.send('false'); // Música não cadastrada
    }
});

// Rota para cadastrar uma nova música
app.post('/cadastrar', (req, res) => {
    const { nome, album, artista, genero } = req.body;

    // Adiciona a nova música ao array de músicas
    musicas.push({ nome, album, artista, genero });
    
    res.send('Música cadastrada com sucesso!');
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
