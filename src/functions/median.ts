export const Median = (image: string) => {
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

    applyMedian();
  };

  imagem.onerror = () => {
    console.error('Erro ao carregar a imagem.');
  };

  const applyMedian = () => {
    ctx.drawImage(imagem, 0, 0, canvas.width, canvas.height);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const width = canvas.width;
    const height = canvas.height;

    const getPixelIndex = (x: number, y: number) => (y * width + x) * 4;

    const median = (values: number[]) => {
      values.sort((a, b) => a - b);
      const mid = Math.floor(values.length / 2);
      return values.length % 2 !== 0 ? values[mid] : (values[mid - 1] + values[mid]) / 2;
    };

    const newImageData = new Uint8ClampedArray(data);

    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const reds: number[] = [];
        const greens: number[] = [];
        const blues: number[] = [];

        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const pixelIndex = getPixelIndex(x + dx, y + dy);
            reds.push(data[pixelIndex]);
            greens.push(data[pixelIndex + 1]);
            blues.push(data[pixelIndex + 2]);
          }
        }

        const pixelIndex = getPixelIndex(x, y);
        newImageData[pixelIndex] = median(reds);     // Red
        newImageData[pixelIndex + 1] = median(greens); // Green
        newImageData[pixelIndex + 2] = median(blues);  // Blue
      }
    }

    ctx.putImageData(new ImageData(newImageData, width, height), 0, 0);
  };
};