export const Erosion = (image: string, maskType: string) => {
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

    applyErosion(maskType);
  };

  imagem.onerror = () => {
    console.error('Erro ao carregar a imagem.');
  };

  const applyErosion = (maskType: string) => {
    ctx.drawImage(imagem, 0, 0, canvas.width, canvas.height);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    const kernel = getKernel(maskType);
    const kernelSize = kernel.length; // Largura e altura do kernel
    const offset = Math.floor(kernelSize / 2); // Calcula o deslocamento do kernel

    const width = canvas.width;
    const height = canvas.height;

    const tempData = new Uint8ClampedArray(data);

    for (let y = offset; y < height - offset; y++) {
      for (let x = offset; x < width - offset; x++) {
        let minR = 255;
        let minG = 255;
        let minB = 255;

        for (let ky = -offset; ky <= offset; ky++) {
          for (let kx = -offset; kx <= offset; kx++) {
            const pixelIndex = ((y + ky) * width + (x + kx)) * 4;

            if (kernel[ky + offset][kx + offset] === 1) {
              minR = Math.min(minR, data[pixelIndex]);
              minG = Math.min(minG, data[pixelIndex + 1]);
              minB = Math.min(minB, data[pixelIndex + 2]);
            }
          }
        }

        const idx = (y * width + x) * 4;
        tempData[idx] = minR;
        tempData[idx + 1] = minG;
        tempData[idx + 2] = minB;
      }
    }

    ctx.putImageData(new ImageData(tempData, width, height), 0, 0);
  };

  const getKernel = (maskType: string) => {
    switch (maskType) {
      case 'quadrado3':
        return [
          [1, 1, 1],
          [1, 1, 1],
          [1, 1, 1],
        ];
      case 'quadrado5':
        return [
          [1, 1, 1, 1, 1],
          [1, 1, 1, 1, 1],
          [1, 1, 1, 1, 1],
          [1, 1, 1, 1, 1],
          [1, 1, 1, 1, 1],
        ];
      case 'cruz3':
        return [
          [0, 1, 0],
          [1, 1, 1],
          [0, 1, 0],
        ];
      case 'cruz5':
        return [
          [0, 0, 1, 0, 0],
          [0, 1, 1, 1, 0],
          [1, 1, 1, 1, 1],
          [0, 1, 1, 1, 0],
          [0, 0, 1, 0, 0],
        ];
      default:
        return [
          [1, 1, 1],
          [1, 1, 1],
          [1, 1, 1],
        ];
    }
  };
};