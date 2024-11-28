export const CountDominoDots = async (imageSrc: string): Promise<string> => {
  const canvas = document.getElementById('meuCanvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    console.error('Contexto do canvas não está disponível.');
    return '';
  }

  const imagem = new Image();
  imagem.src = imageSrc;

  return new Promise<string>((resolve, reject) => {
    imagem.onload = () => {
      canvas.width = imagem.width;
      canvas.height = imagem.height;
      ctx.drawImage(imagem, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      let upperDots = 0;
      let lowerDots = 0;

      const threshold = 128; // Limite de brilho para considerar como parte do ponto (escuro)
      const whiteThreshold = 200; // Limite para considerar espaço branco (brilho alto)
      const middleLineY = Math.floor(canvas.height / 2);

      let lastPointX = -1;  // Para armazenar a posição do último ponto detectado na horizontal
      let lastPointY = -1;  // Para armazenar a posição do último ponto detectado na vertical

      const isDark = (r: number, g: number, b: number) => {
        const brightness = (r + g + b) / 3;
        return brightness < threshold; // Ponto é escuro se o brilho for abaixo do limite
      };

      const isWhite = (r: number, g: number, b: number) => {
        const brightness = (r + g + b) / 3;
        return brightness > whiteThreshold; // Espaço branco é se o brilho for acima do limite
      };

      // Função que detecta se há um ponto em uma região específica
      const isPointDetected = (x: number, y: number) => {
        const index = (y * canvas.width + x) * 4;
        const r = data[index]; 
        const g = data[index + 1]; 
        const b = data[index + 2];
        return isDark(r, g, b);
      };

      // Função para verificar se há um espaço branco suficiente ao redor do ponto
      const hasWhiteSpaceAround = (x: number, y: number) => {
        // Verificar espaço branco ao redor do ponto em um intervalo de 3x3 (pode ser ajustado)
        const directions = [
          { dx: -1, dy: 0 }, { dx: 1, dy: 0 },  // Horizontais
          { dx: 0, dy: -1 }, { dx: 0, dy: 1 }   // Verticais
        ];

        let isWhiteSpace = false;
        directions.forEach(({ dx, dy }) => {
          const nx = x + dx;
          const ny = y + dy;
          if (nx >= 0 && ny >= 0 && nx < canvas.width && ny < canvas.height) {
            const index = (ny * canvas.width + nx) * 4;
            const r = data[index]; 
            const g = data[index + 1]; 
            const b = data[index + 2];
            if (isWhite(r, g, b)) {
              isWhiteSpace = true;
            }
          }
        });
        return isWhiteSpace;
      };

      // Função para detectar e contar os pontos
      const countPointsInRegion = (startY: number, endY: number): number => {
        let count = 0;
        for (let y = startY; y < endY; y++) {
          for (let x = 0; x < canvas.width; x++) {
            // Verificar se é um ponto escuro e se tem espaço branco ao redor
            if (isPointDetected(x, y) && hasWhiteSpaceAround(x, y)) {
              // Se o ponto estiver na parte superior (acima da linha do meio)
              if (y < middleLineY && lastPointY < middleLineY) {
                count++;
                lastPointX = x;
                lastPointY = y;
              }
              // Se o ponto estiver na parte inferior (abaixo da linha do meio)
              if (y >= middleLineY && lastPointY >= middleLineY) {
                count++;
                lastPointX = x;
                lastPointY = y;
              }
            }
          }
        }
        return count;
      };

      // Contando pontos na parte superior e inferior
      upperDots = countPointsInRegion(0, middleLineY);
      lowerDots = countPointsInRegion(middleLineY, canvas.height);

      resolve(`Pontos na parte superior: ${upperDots}\nPontos na parte inferior: ${lowerDots}`);
    };

    imagem.onerror = () => {
      reject('Erro ao carregar a imagem.');
    };
  });
};
