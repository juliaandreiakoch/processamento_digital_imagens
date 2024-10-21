export const SobelEdgeDetection = (image: string) => {
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

    applySobel();
  };

  imagem.onerror = () => {
    console.error('Erro ao carregar a imagem.');
  };

  const applySobel = () => {
    ctx.drawImage(imagem, 0, 0, canvas.width, canvas.height);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    const width = canvas.width;
    const height = canvas.height;
    const sobelData = new Uint8ClampedArray(data.length);
    const grayscaleData = new Uint8ClampedArray(width * height);

    for (let i = 0; i < data.length; i += 4) {
      const red = data[i];
      const green = data[i + 1];
      const blue = data[i + 2];
      const grayscale = red * 0.3 + green * 0.59 + blue * 0.11;
      grayscaleData[i / 4] = grayscale;
    }

    const sobelX = [
      -1, 0, 1,
      -2, 0, 2,
      -1, 0, 1
    ];

    const sobelY = [
      -1, -2, -1,
      0, 0, 0,
      1, 2, 1
    ];

    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        let pixelX = 0;
        let pixelY = 0;

        for (let ky = -1; ky <= 1; ky++) {
          for (let kx = -1; kx <= 1; kx++) {
            const pos = (y + ky) * width + (x + kx);
            pixelX += grayscaleData[pos] * sobelX[(ky + 1) * 3 + (kx + 1)];
            pixelY += grayscaleData[pos] * sobelY[(ky + 1) * 3 + (kx + 1)];
          }
        }

        const magnitude = Math.sqrt(pixelX * pixelX + pixelY * pixelY);
        const index = (y * width + x) * 4;

        sobelData[index] = magnitude;
        sobelData[index + 1] = magnitude;
        sobelData[index + 2] = magnitude;
        sobelData[index + 3] = 255; // Opacidade
      }
    }

    const outputImageData = new ImageData(sobelData, width, height);
    ctx.putImageData(outputImageData, 0, 0);
  };
};
