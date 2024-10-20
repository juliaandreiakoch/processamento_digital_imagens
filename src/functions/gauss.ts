export const Gauss = (image: string, kernelSize: number) => {
    const canvas = document.getElementById('meuCanvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
  
    if (!ctx) {
      console.error('Contexto do canvas não está disponível.');
      return;
    }
  
    const imgElement = document.querySelector('.imageBox img') as HTMLImageElement;
  
    if (!imgElement) {
      console.error('Imagem não encontrada.');
      return;
    }
  
    imgElement.src = image;
  
    imgElement.onload = () => {
      canvas.width = imgElement.width;
      canvas.height = imgElement.height;
  
      ctx.drawImage(imgElement, 0, 0, canvas.width, canvas.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
  
      const gaussianKernel = generateGaussianKernel(kernelSize);
  
      const newImageData = applyConvolution(data, imgElement.width, imgElement.height, gaussianKernel);
      ctx.putImageData(newImageData, 0, 0);
    };
  
    imgElement.onerror = () => {
      console.error('Erro ao carregar a imagem.');
    };
  };
  
  const generateGaussianKernel = (size: number): number[] => {
    const sigma = size / 6;
    const kernel = [];
    const mean = Math.floor(size / 2);
    let sum = 0;
    
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        const value = Math.exp(-0.5 * (Math.pow((x - mean) / sigma, 2.0) + Math.pow((y - mean) / sigma, 2.0))) / (2 * Math.PI * sigma * sigma);
        kernel.push(value);
        sum += value;
      }
    }
  
    return kernel.map(value => value / sum);
  };
  
  const applyConvolution = (data: Uint8ClampedArray, width: number, height: number, kernel: number[]): ImageData => {
    const result = new Uint8ClampedArray(data.length);
    const kernelSize = Math.sqrt(kernel.length);
    const halfKernel = Math.floor(kernelSize / 2);
  
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        let r = 0, g = 0, b = 0;
  
        for (let kx = -halfKernel; kx <= halfKernel; kx++) {
          for (let ky = -halfKernel; ky <= halfKernel; ky++) {
            const posX = x + kx;
            const posY = y + ky;
  
            if (posX >= 0 && posX < width && posY >= 0 && posY < height) {
              const offset = (posY * width + posX) * 4;
              const weight = kernel[(kx + halfKernel) * kernelSize + (ky + halfKernel)];
  
              r += data[offset] * weight;
              g += data[offset + 1] * weight;
              b += data[offset + 2] * weight;
            }
          }
        }
  
        const idx = (y * width + x) * 4;
        result[idx] = r;
        result[idx + 1] = g;
        result[idx + 2] = b;
        result[idx + 3] = data[idx + 3]; 
      }
    }
  
    return new ImageData(result, width, height);
  };
  