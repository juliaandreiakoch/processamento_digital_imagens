export const RobertsEdgeDetection = (image: string) => {
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

    applyRoberts();
  };

  imagem.onerror = () => {
    console.error('Erro ao carregar a imagem.');
  };

  const applyRoberts = () => {
    ctx.drawImage(imagem, 0, 0, canvas.width, canvas.height);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    const width = canvas.width;
    const height = canvas.height;
    const robertsData = new Uint8ClampedArray(data.length);
    const grayscaleData = new Uint8ClampedArray(width * height);

    for (let i = 0; i < data.length; i += 4) {
      const red = data[i];
      const green = data[i + 1];
      const blue = data[i + 2];
      const grayscale = red * 0.3 + green * 0.59 + blue * 0.11;
      grayscaleData[i / 4] = grayscale;
    }

    for (let y = 0; y < height - 1; y++) {
      for (let x = 0; x < width - 1; x++) {
        const pos = y * width + x;

        const Gx = grayscaleData[pos] - grayscaleData[pos + width + 1];
        const Gy = grayscaleData[pos + 1] - grayscaleData[pos + width];

        const magnitude = Math.sqrt(Gx * Gx + Gy * Gy);
        const index = (y * width + x) * 4;

        robertsData[index] = magnitude;
        robertsData[index + 1] = magnitude;
        robertsData[index + 2] = magnitude;
        robertsData[index + 3] = 255; // Opacidade
      }
    }

    const outputImageData = new ImageData(robertsData, width, height);
    ctx.putImageData(outputImageData, 0, 0);
  };
};
