export const Rotate = (image: string, angle: number) => {
  const canvas = document.getElementById('meuCanvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    console.error('Contexto do canvas não está disponível.');
    return;
  }

  const imagem = new Image();
  imagem.src = image;

  imagem.onload = () => {
    // Define o tamanho do canvas para a dimensão da imagem
    canvas.width = imagem.width;
    canvas.height = imagem.height;

    desenharImagem(angle);
  };

  imagem.onerror = () => {
    console.error('Erro ao carregar a imagem.');
  };

  // Função para desenhar a imagem com a rotação aplicada
  const desenharImagem = (rotationAngle: number) => {
    // Limpa o canvas antes de aplicar qualquer transformação
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Salva o estado atual do contexto
    ctx.save();

    // Move o ponto de origem para o centro da imagem
    ctx.translate(canvas.width / 2, canvas.height / 2);

    // Converte o ângulo para radianos e aplica a rotação
    const radians = rotationAngle * (Math.PI / 180);
    ctx.rotate(radians);

    // Desenha a imagem rotacionada, ajustando o ponto de origem
    ctx.drawImage(imagem, -imagem.width / 2, -imagem.height / 2);

    // Restaura o estado anterior do contexto (antes da rotação)
    ctx.restore();
  };
}
