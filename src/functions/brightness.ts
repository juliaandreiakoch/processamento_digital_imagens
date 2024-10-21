export const Brightness = (image: string, brightnessValue: number) => {
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

    applyBrightness(brightnessValue);
  };

  imagem.onerror = () => {
    console.error('Erro ao carregar a imagem.');
  };

  const applyBrightness = (brightness: number) => {
    ctx.drawImage(imagem, 0, 0, canvas.width, canvas.height);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      data[i] += brightness;
      data[i + 1] += brightness;
      data[i + 2] += brightness;
    }

    ctx.putImageData(imageData, 0, 0);
  };
}
