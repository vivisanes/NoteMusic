class Musica {
    constructor(nome, album, artista, genero) {
        this.nome = nome;
        this.album = album;
        this.artista = artista;
        this.genero = genero;
    }

    async cadastrar() {
        try {
            // Verifica se a música já está cadastrada
            const repetido = await this.verifica_Repeticao();

            if (repetido) {
                console.log('Música já cadastrada! Por favor, adicione outra música.');
                alert('Música já cadastrada! Por favor, adicione outra música.');
            } else {
                // Se não estiver cadastrada, cadastra a música
                const response = await this.cadastro();
                // Verifica o status de response
                if (response.status === 200) {
                    console.log('Música Cadastrada!');
                    alert('Música Cadastrada com sucesso!');
                } else {
                    console.log('Erro no Cadastro! Verifique se os dados estão corretos.');
                    alert('Erro no Cadastro! Verifique se os dados estão corretos.');
                }
            }
        } catch (error) {
            alert('Erro ao processar a solicitação.');
        }
    }

    async verifica_Repeticao() {
        try {
            const formData = new URLSearchParams();
            formData.append('nome', this.nome);
            formData.append('album', this.album);
            formData.append('artista', this.artista);
            formData.append('genero', this.genero);

            const response = await fetch('/verificar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formData.toString()
            });

            const data = await response.text(); // Assume que a resposta é texto simples
            return data === 'true'; // Assuma que o servidor retorna 'true' ou 'false'
        } catch (error) {
            console.error('Erro ao verificar repetição:', error);
            return false;
        }
    }

    async cadastro() {
        try {
            const formData = new URLSearchParams();
            formData.append('nome', this.nome);
            formData.append('album', this.album);
            formData.append('artista', this.artista);
            formData.append('genero', this.genero);

            const response = await fetch('/cadastrar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formData.toString()
            });

            const data = await response.text(); // Assume que a resposta é texto simples
            return { status: response.status }; // Retorna o status HTTP
        } catch (error) {
            console.error('Erro ao cadastrar música:', error);
            return { status: 500 }; // Código de erro genérico
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('musicForm'); // Alterado para id correto
    const nomeInput = document.getElementById('nome');
    const albumInput = document.getElementById('album');
    const artistaInput = document.getElementById('artista');
    const generoSelect = document.getElementById('genero');

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Impede o envio padrão do formulário

        // Captura os valores dos campos
        const nome = nomeInput.value;
        const album = albumInput.value;
        const artista = artistaInput.value;
        const genero = generoSelect.value;

        // Cria uma instância da classe Musica com os dados do formulário
        const musica = new Musica(nome, album, artista, genero);

        // Chama o método para verificar e cadastrar
        await musica.cadastrar();
    });
});
