export const Translate = (image: string, deslocamentoX: number, deslocamentoY: number) => {
  console.log("antes do listener");
  console.log("FUNÇÃO TRANSLATE");
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

    desenharImagem();
  };

  imagem.onerror = () => {
    console.error('Erro ao carregar a imagem.');
  };

  // Função para desenhar a imagem com os deslocamentos atuais
  const desenharImagem = () => {
    const deslocamentoHorizontal = deslocamentoX;
    const deslocamentoVertical = deslocamentoY;

    // Limpa o canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Salva o estado atual do contexto
    ctx.save();

    // Aplica a tradução
    ctx.translate(deslocamentoHorizontal, deslocamentoVertical);

    // Desenha a imagem na posição transladada
    ctx.drawImage(imagem, 0, 0);

    // Restaura o estado anterior do contexto
    ctx.restore();
  };
}
