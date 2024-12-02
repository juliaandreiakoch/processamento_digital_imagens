export const CountDominoDots = async (imageSrc: string): Promise<string> => {
  const canvas = document.getElementById("meuCanvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    console.error("Contexto do canvas não está disponível.");
    return "";
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

      const width = canvas.width;
      const height = canvas.height;
      const middleLineY = Math.floor(height / 2);

      const threshold = 128; // Limite para considerar um pixel escuro
      const visited = new Set<string>();

      const isDark = (r: number, g: number, b: number): boolean => {
        const brightness = (r + g + b) / 3;
        return brightness < threshold;
      };

      const getPixelColor = (x: number, y: number): [number, number, number] => {
        const index = (y * width + x) * 4;
        return [data[index], data[index + 1], data[index + 2]];
      };

      const floodFill = (x: number, y: number): number => {
        const stack = [[x, y]];
        let regionSize = 0;

        while (stack.length > 0) {
          const [cx, cy] = stack.pop()!;
          const key = `${cx}, ${cy}`;

          if (visited.has(key)) continue;
          visited.add(key);
          regionSize++;

          for (const [dx, dy] of [
            [-1, 0],
            [1, 0],
            [0, -1],
            [0, 1],
          ]) {
            const nx = cx + dx;
            const ny = cy + dy;

            if (
              nx >= 0 &&
              nx < width &&
              ny >= 0 &&
              ny < height &&
              !visited.has(`${nx}, ${ny}`)
            ) {
              const [r, g, b] = getPixelColor(nx, ny);
              if (isDark(r, g, b)) {
                stack.push([nx, ny]);
              }
            }
          }
        }

        return regionSize;
      };

      const countDotsInRegion = (startY: number, endY: number): number => {
        const detectedDots: { x: number; y: number }[] = [];
        let count = 0;

        for (let y = startY; y < endY; y++) {
          for (let x = 40; x < width - 40; x++) {
            if (!visited.has(`${x}, ${y}`)) {
              const [r, g, b] = getPixelColor(x, y);
              if (isDark(r, g, b)) {
                const regionSize = floodFill(x, y);
                if (regionSize > 150) { // Ajuste para ignorar ruídos
                  const isNearby = detectedDots.some(
                    (dot) =>
                      Math.sqrt(
                        Math.pow(dot.x - x, 2) + Math.pow(dot.y - y, 2)
                      ) < 30 // Distância mínima entre pontos
                  );

                  if (!isNearby) {
                    detectedDots.push({ x, y });
                    count++;
                  }
                }
              }
            }
          }
        }

        return count;
      };

      const tolerance = 20;
      const upperDots = countDotsInRegion(30, middleLineY - tolerance);
      const lowerDots = countDotsInRegion(middleLineY + tolerance, height - 30);

      resolve(
        `Pontos na parte superior: ${upperDots}\nPontos na parte inferior: ${lowerDots}`
      );
    };

    imagem.onerror = () => {
      reject("Erro ao carregar a imagem.");
    };
  });
};