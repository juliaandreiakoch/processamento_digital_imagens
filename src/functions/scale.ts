export function Scale(imageSrc: string, scaleFactor: number, direction: string) {
    const canvas = document.getElementById('meuCanvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    
    if (!ctx || !imageSrc) return;
  
    const img = new Image();
    img.src = imageSrc;
  
    img.onload = () => {
      const width = img.width * (direction === 'increase' ? scaleFactor : 1 / scaleFactor);
      const height = img.height * (direction === 'increase' ? scaleFactor : 1 / scaleFactor);
  
      // Limpa o canvas antes de desenhar
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      // Centraliza a imagem no canvas
      const x = (canvas.width - width) / 2;
      const y = (canvas.height - height) / 2;
  
      ctx.drawImage(img, x, y, width, height);
    };
  }
  