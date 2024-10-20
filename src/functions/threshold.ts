export const Threshold = (image: string, thresholdValue: number) => {
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

    aplicarThreshold(thresholdValue);
  };

  imagem.onerror = () => {
    console.error('Erro ao carregar a imagem.');
  };

  const aplicarThreshold = (threshold: number) => {
    ctx.drawImage(imagem, 0, 0, canvas.width, canvas.height);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const grayscale = (data[i] + data[i + 1] + data[i + 2]) / 3;
      
      const value = grayscale > threshold ? 255 : 0;
      
      data[i] = data[i + 1] = data[i + 2] = value;
    }

    ctx.putImageData(imageData, 0, 0);
  };
};
