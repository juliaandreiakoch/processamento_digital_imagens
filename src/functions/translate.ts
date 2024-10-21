export const Translate = (image: string, deslocamentoX: number, deslocamentoY: number) => {
  const canvas = document.getElementById('meuCanvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    console.error('Contexto do canvas não está disponível.');
    return;
  }

  const imagem = new Image();
  imagem.src = image;

  imagem.onload = () => {
    canvas.width = imagem.width;
    canvas.height = imagem.height;

    drawImage();
  };

  imagem.onerror = () => {
    console.error('Erro ao carregar a imagem.');
  };

  const drawImage = () => {
    const deslocamentoHorizontal = deslocamentoX;
    const deslocamentoVertical = deslocamentoY;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(deslocamentoHorizontal, deslocamentoVertical);
    ctx.drawImage(imagem, 0, 0);
    ctx.restore();
  };
}
