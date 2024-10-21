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
    canvas.width = imagem.width;
    canvas.height = imagem.height;

    drawImage(angle);
  };

  imagem.onerror = () => {
    console.error('Erro ao carregar a imagem.');
  };

  const drawImage = (rotationAngle: number) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);

    const radians = rotationAngle * (Math.PI / 180);
    ctx.rotate(radians);
    ctx.drawImage(imagem, -imagem.width / 2, -imagem.height / 2);
    ctx.restore();
  };
}
