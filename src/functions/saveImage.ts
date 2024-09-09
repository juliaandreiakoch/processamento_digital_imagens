export const SaveImage = () => {
  const canvas = document.getElementById('meuCanvas') as HTMLCanvasElement;

  if (!canvas) {
    console.error('Canvas não encontrado.');
    return;
  }

  const dataURL = canvas.toDataURL('image/png'); // Converte o canvas para uma URL de dados no formato PNG

  // Cria um link para download
  const link = document.createElement('a');
  link.href = dataURL;
  link.download = 'imagem.png'; // Define o nome do arquivo a ser salvo

  // Simula o clique no link para iniciar o download
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Exemplo de uso: chamar a função para salvar a imagem quando necessário
SaveImage();
