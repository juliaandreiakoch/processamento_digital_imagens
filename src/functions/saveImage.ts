export const SaveImage = () => {
  const canvas = document.getElementById('meuCanvas') as HTMLCanvasElement;

  if (!canvas) {
    console.error('Canvas não encontrado.');
    return;
  }

  const dataURL = canvas.toDataURL('image/png');

  const link = document.createElement('a');
  link.href = dataURL;
  link.download = 'imagem.png';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

SaveImage();
