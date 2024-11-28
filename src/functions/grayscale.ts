export const Grayscale = (image: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const canvas = document.getElementById('meuCanvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      console.error('Contexto do canvas não está disponível.');
      reject('Canvas não disponível');
      return;
    }

    const imagem = new Image();
    imagem.src = image;

    imagem.onload = () => {
      canvas.width = imagem.width;
      canvas.height = imagem.height;

      ctx.drawImage(imagem, 0, 0, canvas.width, canvas.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const red = data[i];
        const green = data[i + 1];
        const blue = data[i + 2];

        const grayscale = red * 0.3 + green * 0.59 + blue * 0.11;

        data[i] = grayscale; // Red
        data[i + 1] = grayscale; // Green
        data[i + 2] = grayscale; // Blue
      }

      ctx.putImageData(imageData, 0, 0);

      resolve(canvas.toDataURL());
    };

    imagem.onerror = () => {
      console.error('Erro ao carregar a imagem.');
      reject('Erro ao carregar a imagem.');
    };
  });
};
