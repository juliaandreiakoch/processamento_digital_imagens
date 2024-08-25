import { useRef, useState } from 'react';
import './App.css';
import './assets/expandDown.png';
import expandDownIcon from './assets/expandDown.png'

function App() {

  const [isFileExpanded, setIsFileExpanded] = useState<boolean>(false);
  const [isTransformationExpanded, setIsTransformationExpanded] = useState<boolean>(false);
  const [isFilterExpanded, setIsFilterExpanded] = useState<boolean>(false);
  const [isMorphologyExpanded, setIsMorphologyExpanded] = useState<boolean>(false);
  const [isExtractionExpanded, setIsExtractionExpanded] = useState<boolean>(false);
  const [imageSrc1, setImageSrc1] = useState<string | null>(null);
  const [imageSrc2, setImageSrc2] = useState<string | null>(null);
  const fileInputRef1 = useRef<HTMLInputElement>(null);
  const fileInputRef2 = useRef<HTMLInputElement>(null);

  const handleImageUpload1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc1(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  const handleImageUpload2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc2(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  const handleOpenImage1 = () => {
    if (fileInputRef1.current) {
      fileInputRef1.current.click();
    }
  };

  const handleOpenImage2 = () => {
    if (fileInputRef2.current) {
      fileInputRef2.current.click();
    }
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef1}
        style={{ display: 'none' }}
        onChange={handleImageUpload1}
      />
      <input
        type="file"
        ref={fileInputRef2}
        style={{ display: 'none' }}
        onChange={handleImageUpload2}
      />
      <nav>
        <ul className='headerMenu'>
          <div className='expandedItem'>
            <button type="button" onClick={() => { setIsFileExpanded(!isFileExpanded) }}>
              <div className='buttonImage'>
                arquivo
                <img src={expandDownIcon} alt='Expand down icon' />
              </div>
            </button>
            {isFileExpanded && (
              <ul className='expandedList'>
                <li onClick={handleOpenImage1}>Abrir imagem 1</li>
                <hr />
                <li onClick={handleOpenImage2}>Abrir imagem 2</li>
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
              <div className='buttonImage'>
                transformações geométricas
                <img src={expandDownIcon} alt='Expand down icon' />
              </div>
            </button>
            {isTransformationExpanded && (
              <ul className='expandedList'>
                <li>Transladar</li>
                <hr />
                <li>Rotacionar</li>
                <hr />
                <li>Espelhar</li>
                <hr />
                <li>Aumentar</li>
                <hr />
                <li>Diminuir</li>
              </ul>
            )}
          </div>
          <div>
            <button onClick={() => { setIsFilterExpanded(!isFilterExpanded) }}>
              <div className='buttonImage'>
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
              <div className='buttonImage'>
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
              <div className='buttonImage'>
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
      <div className="imagesContainer">
        <div className="imageBox">
          {imageSrc1 && <img src={imageSrc1} alt="Imagem 1" />}
        </div>
        <div className="imageBox">
          {imageSrc2 && <img src={imageSrc2} alt="Imagem 2" />}
        </div>
      </div>
    </div>
  );
}

export default App;
