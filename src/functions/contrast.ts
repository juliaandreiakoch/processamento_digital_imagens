export const Contrast = (image: string, contrastValue: number) => {
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

    applyContrast(contrastValue);
  };

  imagem.onerror = () => {
    console.error('Erro ao carregar a imagem.');
  };

  const applyContrast = (contrast: number) => {
    ctx.drawImage(imagem, 0, 0, canvas.width, canvas.height);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));

    for (let i = 0; i < data.length; i += 4) {
      for (let j = 0; j < 3; j++) {
        data[i + j] = factor * (data[i + j] - 128) + 128;
        data[i + j] = Math.min(255, Math.max(0, data[i + j]));
      }
    }

    ctx.putImageData(imageData, 0, 0);
  };
};
