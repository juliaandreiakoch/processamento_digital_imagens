import { useRef, useState } from 'react';
import './App.css';
import './assets/expandDown.png';
import expandDownIcon from './assets/expandDown.png';
import { Translate } from './functions/translate';
import { Flip } from './functions/flip';
import { Scale } from './functions/scale';
import { Rotate } from './functions/rotate';
import { SaveImage } from './functions/saveImage';
import { Grayscale } from './functions/grayscale';
import { Brightness } from './functions/brightness';
import { Contrast } from './functions/contrast';
import { Threshold } from './functions/threshold';
import { Median } from './functions/median';
import { Gauss } from './functions/gauss';
import { SobelEdgeDetection } from './functions/sobel';
import { RobertsEdgeDetection } from './functions/roberts';
import { Dilatation } from './functions/dilatation';

function App() {
  const [isFileExpanded, setIsFileExpanded] = useState<boolean>(false);
  const [isTransformationExpanded, setIsTransformationExpanded] = useState<boolean>(false);
  const [isFilterExpanded, setIsFilterExpanded] = useState<boolean>(false);
  const [isMorphologyExpanded, setIsMorphologyExpanded] = useState<boolean>(false);
  const [isExtractionExpanded, setIsExtractionExpanded] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [deslocHorizontal, setDeslocHorizontal] = useState<number>(0);
  const [deslocVertical, setDeslocVertical] = useState<number>(0);
  const [translateClicked, setTranslateClicked] = useState<boolean>(false);

  const [flipClicked, setFlipClicked] = useState<boolean>(false);
  const [flipDirection, setFlipDirection] = useState<string>('horizontal');

  const [scaleClicked, setScaleClicked] = useState<"increase" | "decrease" | "">("");
  const [scaleFactor, setScaleFactor] = useState<number>(0);

  const [rotateClicked, setRotateClicked] = useState<boolean>(false);
  const [rotateAngle, setRotateAngle] = useState<number>(0);

  const [dilatationClicked, setDilatationClicked] = useState<boolean>(false);
  const [dilatationElement, setDilatationElement] = useState<string>('');

  const [erosionClicked, setErosionClicked] = useState<boolean>(false);
  const [erosionElement, setErosionElement] = useState<string>('');

  const [brightness, setBrightness] = useState<number>(0);
  const [contrast, setContrast] = useState<number>(0);
  const [brightnessClicked, setBrightnessClicked] = useState<boolean>(false);
  const [contrastClicked, setContrastClicked] = useState<boolean>(false);
  const [thresholdClicked, setThresholdClicked] = useState(false);
  const [thresholdValue, setThresholdValue] = useState<number>(128);
  const [gaussClicked, setGaussClicked] = useState(false);
  const [kernelSize, setKernelSize] = useState<number>(3);
  const [aboutSelected, setAboutSelected] = useState<boolean>(false);

  const restartGeometricTransformation = () => {
    setTranslateClicked(false);
    setRotateClicked(false);
    setScaleClicked('');
    setFlipClicked(false);
    setIsTransformationExpanded(false);
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOpenImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleTranslate = () => {
    Translate(imageSrc, deslocHorizontal, deslocVertical);
  };

  const handleRotate = () => {
    Rotate(imageSrc, rotateAngle);
  }

  const handleFlip = () => {
    Flip(imageSrc, flipDirection);
  };

  const handleScale = () => {
    if (scaleClicked) {
      Scale(imageSrc, scaleFactor, scaleClicked);
    }
  };

  const handleGrayscale = () => {
    Grayscale(imageSrc);
  };

  const handleMedian = () => {
    Median(imageSrc);
  };

  const handleSobel = () => {
    SobelEdgeDetection(imageSrc);
  }

  const handleRoberts = () => {
    RobertsEdgeDetection(imageSrc);
  }

  return (
    <div className='content'>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleImageUpload}
      />
      <nav>
        <ul className='headerMenu'>
          <div className='expandedItem'>
            <button type="button" onClick={() => { setIsFileExpanded(!isFileExpanded) }}>
              <div className='buttonImage' id="1">
                arquivo
                <img src={expandDownIcon} alt='Expand down icon' />
              </div>
            </button>
            {isFileExpanded && (
              <ul className='expandedList'>
                <li onClick={() => { handleOpenImage(); setIsFileExpanded(false); setAboutSelected(false) }}>Abrir imagem</li>
                <hr />
                <li onClick={() => { SaveImage(); setIsFileExpanded(false); setAboutSelected(false) }}>Salvar imagem</li>
                <hr />
                <li onClick={() => { setAboutSelected(true); setIsFileExpanded(false) }}>Sobre</li>
              </ul>
            )}
          </div>
          <div>
            <button onClick={() => { setIsTransformationExpanded(!isTransformationExpanded) }}>
              <div className='buttonImage' id="1">
                transformações geométricas
                <img src={expandDownIcon} alt='Expand down icon' />
              </div>
            </button>
            {isTransformationExpanded && (
              <ul className='expandedList'>
                <li onClick={() => { setTranslateClicked(!translateClicked); setRotateClicked(false); setScaleClicked(''); setFlipClicked(false); setIsTransformationExpanded(false) }}>Transladar</li>
                <hr />
                <li onClick={() => { setFlipClicked(!flipClicked); setTranslateClicked(false); setRotateClicked(false); setScaleClicked(''); setIsTransformationExpanded(false) }}>Espelhar</li>
                <hr />
                <li onClick={() => { setScaleClicked('increase'); setTranslateClicked(false); setRotateClicked(false); setFlipClicked(false); setIsTransformationExpanded(false) }}>Aumentar</li>
                <hr />
                <li onClick={() => { setScaleClicked('decrease'); setTranslateClicked(false); setRotateClicked(false); setFlipClicked(false); setIsTransformationExpanded(false) }}>Diminuir</li>
                <hr />
                <li onClick={() => { setRotateClicked(!rotateClicked); setTranslateClicked(false); setScaleClicked(''); setFlipClicked(false); setIsTransformationExpanded(false) }}>Rotacionar</li>
              </ul>
            )}
          </div>
          <div>
            <button onClick={() => { setIsFilterExpanded(!isFilterExpanded) }}>
              <div className='buttonImage' id="1">
                filtros
                <img src={expandDownIcon} alt='Expand down icon' />
              </div>
            </button>
            {isFilterExpanded && (
              <ul className='expandedList'>
                <li onClick={() => { handleGrayscale(); setIsFilterExpanded(false); restartGeometricTransformation() }}>Grayscale</li>
                <hr />
                <li onClick={() => { setBrightnessClicked(!brightnessClicked); setIsFilterExpanded(false); restartGeometricTransformation() }}>Brilho</li>
                <hr />
                <li onClick={() => { setContrastClicked(!contrastClicked); setIsFilterExpanded(false); restartGeometricTransformation() }}>Contraste</li>
                <hr />
                <li onClick={() => { setThresholdClicked(!thresholdClicked); setIsFilterExpanded(false); restartGeometricTransformation() }}>Threshold</li>
                <hr />
                <li onClick={() => { handleMedian(); setIsFilterExpanded(false); restartGeometricTransformation() }}>Mediana</li>
                <hr />
                <li onClick={() => { setGaussClicked(!gaussClicked); setIsFilterExpanded(false) }}>Gaussiano</li>
                <hr />
                <li onClick={() => { handleSobel(); setIsFilterExpanded(false) }}>Detecção de bordas - Sobel</li>
                <hr />
                <li onClick={() => { handleRoberts(); setIsFilterExpanded(false) }}>Detecção de bordas - Roberts</li>
              </ul>
            )}
          </div>
          <div>
            <button onClick={() => { setIsMorphologyExpanded(!isMorphologyExpanded) }}>
              <div className='buttonImage' id="1">
                morfologia matemática
                <img src={expandDownIcon} alt='Expand down icon' />
              </div>
            </button>
            {isMorphologyExpanded && (
              <ul className='expandedList'>
                <li onClick={() => { setDilatationClicked(true); setIsMorphologyExpanded(false); setErosionClicked(false) }}>Dilatação</li>
                <hr />
                <li onClick={() => { setErosionClicked(true); setIsMorphologyExpanded(false); setDilatationClicked(false) }}>Erosão</li>
                <hr />
                <li>Abertura</li>
                <hr />
                <li>Fechamento</li>
              </ul>
            )}
          </div>
          <div>
            <button onClick={() => { setIsExtractionExpanded(!isExtractionExpanded) }}>
              <div className='buttonImage' id="1">
                extração de características
                <img src={expandDownIcon} alt='Expand down icon' />
              </div>
            </button>
            {isExtractionExpanded && (
              <ul className='expandedList'>
                <li>Desafio</li>
              </ul>
            )}
          </div>
        </ul>
      </nav>

      {translateClicked && (
        <div className='geometric-transformation'>
          <div className='input'>
            <p>Deslocamento Horizontal</p>
            <input
              type="text"
              value={deslocHorizontal}
              onChange={(e) => setDeslocHorizontal(parseInt(e.target.value))}
              placeholder="Digite algo..."
              style={{ padding: '10px', fontSize: '16px' }}
            />
          </div>
          <div className='input'>
            <p>Deslocamento Vertical</p>
            <input
              type="text"
              value={deslocVertical}
              onChange={(e) => setDeslocVertical(parseInt(e.target.value))}
              placeholder="Digite algo..."
              style={{ padding: '10px', fontSize: '16px' }}
            />
          </div>
          <div className='geometric-transformation-image'>
            <button onClick={handleTranslate}>Transladar</button>
          </div>
        </div>
      )}

      {flipClicked && (
        <div className='geometric-transformation'>
          <div className='input'>
            <p>Direção do Espelhamento</p>
            <select value={flipDirection} onChange={(e) => setFlipDirection(e.target.value)}>
              <option value="horizontal">Horizontal</option>
              <option value="vertical">Vertical</option>
            </select>
          </div>
          <div className='geometric-transformation-image'>
            <button onClick={handleFlip}>Espelhar</button>
          </div>
        </div>
      )}

      {scaleClicked && (
        <div className='geometric-transformation'>
          <div className='input'>
            <p>Fator de Escala</p>
            <input
              type="number"
              value={scaleFactor}
              onChange={(e) => setScaleFactor(parseFloat(e.target.value))}
              placeholder="Digite o fator de escala..."
              style={{ padding: '10px', fontSize: '16px' }}
            />
          </div>
          <div className='geometric-transformation-image'>
            <button onClick={handleScale}>Aplicar Escala</button>
          </div>
        </div>
      )}

      {rotateClicked && (
        <div className='geometric-transformation'>
          <div className='input'>
            <p>Ângulo de rotação</p>
            <input
              type="number"
              value={rotateAngle}
              onChange={(e) => setRotateAngle(parseFloat(e.target.value))}
              placeholder="Digite o ângulo de rotação"
              style={{ padding: '10px', fontSize: '16px' }}
            />
          </div>
          <div className='geometric-transformation-image'>
            <button onClick={handleRotate}>Rotacionar</button>
          </div>
        </div>
      )}

      {brightnessClicked && (
        <div className='geometric-transformation'>
          <div className='input'>
            <p>Valor do Brilho</p>
            <input
              type="number"
              value={brightness}
              onChange={(e) => setBrightness(parseFloat(e.target.value))}
              placeholder="Digite o valor do brilho"
              style={{ padding: '10px', fontSize: '16px' }}
            />
          </div>
          <div className='geometric-transformation-image'>
            <button onClick={() => { Brightness(imageSrc, brightness); setBrightnessClicked(false); }}>Aplicar Brilho</button>
          </div>
        </div>
      )}

      {contrastClicked && (
        <div className='geometric-transformation'>
          <div className='input' style={{ display: 'flex', alignItems: 'center' }}>
            <p>Valor do Contraste</p>
            <input
              type="number"
              value={contrast}
              onChange={(e) => setContrast(parseFloat(e.target.value))}
              placeholder="Digite o valor do contraste"
              style={{ padding: '10px', fontSize: '16px', marginRight: '10px' }}
            />
          </div>
          <div className='geometric-transformation-image'>
            <button onClick={() => { Contrast(imageSrc, contrast); setContrastClicked(false); }}>Aplicar Contraste</button>
          </div>
        </div>
      )}

      {thresholdClicked && (
        <div className='geometric-transformation'>
          <div className='input'>
            <p>Valor do Limiar</p>
            <input
              type="number"
              value={thresholdValue}
              onChange={(e) => setThresholdValue(parseInt(e.target.value))}
              placeholder="Digite o valor do limiar"
              style={{ padding: '10px', fontSize: '16px' }}
            />
          </div>
          <div className='geometric-transformation-image'>
            <button onClick={() => { Threshold(imageSrc, thresholdValue); setThresholdClicked(false); }}>Aplicar Limiar</button>
          </div>
        </div>
      )}

      {gaussClicked && (
        <div className='geometric-transformation'>
          <div className='input'>
            <p>Valor ímpar para tamanho do Kernel</p>
            <input
              type="number"
              value={kernelSize}
              onChange={(e) => setKernelSize(parseInt(e.target.value))}
              placeholder="Digite o tamanho do kernel"
              style={{ padding: '10px', fontSize: '16px' }}
            />
          </div>
          <div className='geometric-transformation-image'>
            <button onClick={() => { Gauss(imageSrc, kernelSize); setGaussClicked(false); }}>Aplicar Filtro Gaussiano</button>
          </div>
        </div>
      )}

      {dilatationClicked && (
        <div className='geometric-transformation'>
          <div className='input'>
            <p>Elemento estruturante</p>
            <div className='input-checkbox'>
              <label>
                <input
                  type="radio"
                  name="dilatation"
                  onChange={() => setDilatationElement("cruz3")}
                  style={{ padding: '10px', fontSize: '16px' }}
                />
                Cruz - 3x3
              </label>
              <label>
                <input
                  type="radio"
                  name="dilatation"
                  onChange={() => setDilatationElement("quadrado3")}
                  style={{ padding: '10px', fontSize: '16px' }}
                />
                Quadrado - 3x3
              </label>
              <label>
                <input
                  type="radio"
                  name="dilatation"
                  onChange={() => setDilatationElement("cruz5")}
                  style={{ padding: '10px', fontSize: '16px' }}
                />
                Cruz - 5x5
              </label>
              <label>
                <input
                  type="radio"
                  name="dilatation"
                  onChange={() => setDilatationElement("quadrado5")}
                  style={{ padding: '10px', fontSize: '16px' }}
                />
                Quadrado - 5x5
              </label>
            </div>
          </div>
          <div className='geometric-transformation-image'>
            <button onClick={() => { Dilatation(imageSrc, dilatationElement) }}>Aplicar Dilatação</button>
          </div>
        </div>
      )}

      {erosionClicked && (
        <div className='geometric-transformation'>
          <div className='input'>
            <p>Elemento estruturante</p>
            <div className='input-checkbox'>
              <label>
                <input
                  type="radio"
                  name="erosion"
                  onChange={() => setErosionElement("cruz3")}
                  style={{ padding: '10px', fontSize: '16px' }}
                />
                Cruz - 3x3
              </label>
              <label>
                <input
                  type="radio"
                  name="erosion"
                  onChange={() => setErosionElement("quadrado3")}
                  style={{ padding: '10px', fontSize: '16px' }}
                />
                Quadrado - 3x3
              </label>
              <label>
                <input
                  type="radio"
                  name="erosion"
                  onChange={() => setErosionElement("cruz5")}
                  style={{ padding: '10px', fontSize: '16px' }}
                />
                Cruz - 5x5
              </label>
              <label>
                <input
                  type="radio"
                  name="erosion"
                  onChange={() => setErosionElement("quadrado5")}
                  style={{ padding: '10px', fontSize: '16px' }}
                />
                Quadrado - 5x5
              </label>
            </div>
          </div>
          <div className='geometric-transformation-image'>
            <button onClick={() => { Dilatation(imageSrc, dilatationElement) }}>Aplicar Erosão</button>
          </div>
        </div>
      )}

      {!aboutSelected &&
        <div className="imagesContainer">
          <div className="imageBox">
            {imageSrc && <img src={imageSrc} alt="Imagem 1" />}
          </div>
          <canvas id="meuCanvas"></canvas>
        </div>
      }

      {aboutSelected &&
        <div className='aboutContainer'>
          <div className='aboutInfos'>
            <h2>Processamento Digital de Imagens 2024/02 </h2>
            <h3>Júlia Koch e Yolanda Colombo</h3>
            <p>Este projeto consiste no desenvolvimento de um sistema
              para processamento digital de imagens, utilizando as tecnologias
              TypeScript e React. <br /> <br /> O sistema oferece funcionalidades essenciais,
              como a aplicação de transformações geométricas, filtros de imagem,
              além de operações de morfologia matemática.
              <br /> <br />O objetivo é criar uma ferramenta para manipulação e análise de imagens digitais.</p>
          </div>
        </div>
      }
    </div>
  );
}

export default App;
