import { useRef, useState } from 'react';
import './App.css';
import './assets/expandDown.png';
import expandDownIcon from './assets/expandDown.png';
import { Translate } from './functions/translate';
import { Flip } from './functions/flip';
import { Scale } from './functions/scale';

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

  const [scaleClicked, setScaleClicked] = useState<string | null>(null);
  const [scaleFactor, setScaleFactor] = useState<number>(1.2);

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

  const handleFlip = () => {
    Flip(imageSrc, flipDirection);
  };

  const handleScale = () => {
    if (scaleClicked) {
      Scale(imageSrc, scaleFactor, scaleClicked);
      setScaleClicked(null);
    }
  };

  return (
    <div>
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
                <li onClick={handleOpenImage}>Abrir imagem</li>
                <hr />
                <li>Salvar imagem</li>
                <hr />
                <li>Sobre</li>
                <hr />
                <li>Sair</li>
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
                <li onClick={() => setTranslateClicked(!translateClicked)}>Transladar</li>
                <hr />
                <li onClick={() => setFlipClicked(!flipClicked)}>Espelhar</li>
                <hr />
                <li onClick={() => setScaleClicked('increase')}>Aumentar</li>
                <hr />
                <li onClick={() => setScaleClicked('decrease')}>Diminuir</li>
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
                <li>Grayscale</li>
                <hr />
                <li>Passa Baixa</li>
                <hr />
                <li>Passa Alta</li>
                <hr />
                <li>Threshold</li>
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
                <li>Dilatação</li>
                <hr />
                <li>Erosão</li>
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
        <div className='translate'>
          <div className='translate-input'>
            <p>Deslocamento Horizontal</p>
            <input
              type="text"
              value={deslocHorizontal}
              onChange={(e => (setDeslocHorizontal(parseInt(e.target.value))))}
              placeholder="Digite algo..."
              style={{ padding: '10px', fontSize: '16px' }}
            />
          </div>
          <div className='translate-input'>
            <p>Deslocamento Vertical</p>
            <input
              type="text"
              value={deslocVertical}
              onChange={(e => (setDeslocVertical(parseInt(e.target.value))))}
              placeholder="Digite algo..."
              style={{ padding: '10px', fontSize: '16px' }}
            />
          </div>
          <div className='translatedImage'>
            <button onClick={() => { handleTranslate(); setTranslateClicked(false) }}>Transladar</button>
          </div>
        </div>
      )}

      {flipClicked && (
        <div className='flip'>
          <div className='flip-input'>
            <p>Direção do Espelhamento</p>
            <select value={flipDirection} onChange={(e) => setFlipDirection(e.target.value)}>
              <option value="horizontal">Horizontal</option>
              <option value="vertical">Vertical</option>
            </select>
          </div>
          <div className='flippedImage'>
            <button onClick={() => { handleFlip(); setFlipClicked(false) }}>Aplicar Espelhamento</button>
          </div>
        </div>
      )}

      {scaleClicked && (
        <div className='scale'>
          <div className='scale-input'>
            <p>Fator de Escala</p>
            <input
              type="text"
              value={scaleFactor}
              onChange={(e) => setScaleFactor(parseFloat(e.target.value))}
              placeholder="Digite o fator de escala..."
              style={{ padding: '10px', fontSize: '16px' }}
            />
          </div>
          <div className='scaledImage'>
            <button onClick={handleScale}>Aplicar Escala</button>
          </div>
        </div>
      )}

      <div className="imagesContainer">
        <div className="imageBox">
          {imageSrc && <img src={imageSrc} alt="Imagem 1" />}
        </div>
        <canvas id="meuCanvas"></canvas>
      </div>
    </div>
  );
}

export default App;
