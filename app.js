const presetThemes = [
  {
    name: 'Aurora',
    background: '#0f172a',
    dots: '#38bdf8',
    corners: '#f97316',
    secondDots: '#22c55e',
  },
  {
    name: 'Sunset',
    background: '#1f102a',
    dots: '#f97316',
    corners: '#fb7185',
    secondDots: '#facc15',
  },
  {
    name: 'Mint',
    background: '#04130f',
    dots: '#2dd4bf',
    corners: '#a3e635',
    secondDots: '#f8fafc',
  },
];

const state = {
  url: 'https://openai.com',
  size: 320,
  margin: 10,
  logoImage: '',
  logoSize: 0.24,
  dotsColor: '#38bdf8',
  secondDotsColor: '#22c55e',
  backgroundColor: '#0f172a',
  cornersSquareColor: '#f97316',
  cornersDotColor: '#f8fafc',
  dotsType: 'rounded',
  cornersSquareType: 'extra-rounded',
  cornersDotType: 'dot',
};

const elements = {
  mount: document.querySelector('#qr-preview'),
  url: document.querySelector('#qr-url'),
  dotsColor: document.querySelector('#dots-color'),
  secondDotsColor: document.querySelector('#second-dots-color'),
  backgroundColor: document.querySelector('#background-color'),
  cornersSquareColor: document.querySelector('#corners-square-color'),
  cornersDotColor: document.querySelector('#corners-dot-color'),
  dotsType: document.querySelector('#dots-type'),
  cornersSquareType: document.querySelector('#corners-square-type'),
  cornersDotType: document.querySelector('#corners-dot-type'),
  size: document.querySelector('#qr-size'),
  margin: document.querySelector('#qr-margin'),
  logoFile: document.querySelector('#logo-file'),
  logoSize: document.querySelector('#logo-size'),
  clearLogo: document.querySelector('#clear-logo'),
  sizeValue: document.querySelector('#size-value'),
  marginValue: document.querySelector('#margin-value'),
  logoSizeValue: document.querySelector('#logo-size-value'),
  themePills: document.querySelector('#theme-pills'),
  pngDownload: document.querySelector('#download-png'),
  svgDownload: document.querySelector('#download-svg'),
};

let qrCode;

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(new Error('No se pudo leer el logo.'));
    reader.readAsDataURL(file);
  });
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('No se pudo cargar el logo.'));
    image.src = src;
  });
}

async function createLogoBadge(file) {
  const dataUrl = await fileToDataUrl(file);
  const image = await loadImage(dataUrl);
  const canvas = document.createElement('canvas');
  const size = 420;
  const center = size / 2;
  const outerRadius = 190;
  const innerRadius = 130;
  const context = canvas.getContext('2d');

  canvas.width = size;
  canvas.height = size;

  context.clearRect(0, 0, size, size);

  context.save();
  context.beginPath();
  context.arc(center, center, outerRadius, 0, Math.PI * 2);
  context.closePath();
  context.fillStyle = '#ffffff';
  context.shadowColor = 'rgba(15, 23, 42, 0.22)';
  context.shadowBlur = 24;
  context.fill();
  context.restore();

  context.save();
  context.beginPath();
  context.arc(center, center, innerRadius, 0, Math.PI * 2);
  context.closePath();
  context.clip();

  const imageRatio = Math.min((innerRadius * 2) / image.width, (innerRadius * 2) / image.height);
  const drawWidth = image.width * imageRatio;
  const drawHeight = image.height * imageRatio;
  const drawX = center - drawWidth / 2;
  const drawY = center - drawHeight / 2;

  context.drawImage(image, drawX, drawY, drawWidth, drawHeight);
  context.restore();

  return canvas.toDataURL('image/png');
}

function getQrOptions() {
  return {
    width: state.size,
    height: state.size,
    data: state.url || ' ',
    margin: state.margin,
    qrOptions: {
      errorCorrectionLevel: 'H',
    },
    backgroundOptions: {
      color: state.backgroundColor,
    },
    dotsOptions: {
      color: state.dotsColor,
      type: state.dotsType,
      gradient: {
        type: 'linear',
        rotation: Math.PI / 3,
        colorStops: [
          { offset: 0, color: state.dotsColor },
          { offset: 1, color: state.secondDotsColor },
        ],
      },
    },
    cornersSquareOptions: {
      color: state.cornersSquareColor,
      type: state.cornersSquareType,
    },
    cornersDotOptions: {
      color: state.cornersDotColor,
      type: state.cornersDotType,
    },
    image: state.logoImage || undefined,
    imageOptions: {
      crossOrigin: 'anonymous',
      margin: 2,
      imageSize: state.logoSize,
      hideBackgroundDots: true,
    },
  };
}

function renderQr() {
  if (!qrCode) {
    qrCode = new QRCodeStyling(getQrOptions());
    qrCode.append(elements.mount);
    return;
  }

  qrCode.update(getQrOptions());
}

function syncLabels() {
  elements.sizeValue.textContent = `${state.size}px`;
  elements.marginValue.textContent = `${state.margin}px`;
  elements.logoSizeValue.textContent = `${Math.round(state.logoSize * 100)}%`;
}

function setState(key, value) {
  state[key] = value;
  syncLabels();
  renderQr();
}

function applyTheme(theme) {
  state.backgroundColor = theme.background;
  state.dotsColor = theme.dots;
  state.secondDotsColor = theme.secondDots;
  state.cornersSquareColor = theme.corners;

  elements.backgroundColor.value = state.backgroundColor;
  elements.dotsColor.value = state.dotsColor;
  elements.secondDotsColor.value = state.secondDotsColor;
  elements.cornersSquareColor.value = state.cornersSquareColor;

  renderQr();
}

function initThemePills() {
  presetThemes.forEach((theme) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'theme-pill';
    button.textContent = theme.name;
    button.addEventListener('click', () => applyTheme(theme));
    elements.themePills.appendChild(button);
  });
}

function bindEvents() {
  elements.url.addEventListener('input', (event) => setState('url', event.target.value));
  elements.dotsColor.addEventListener('input', (event) => setState('dotsColor', event.target.value));
  elements.secondDotsColor.addEventListener('input', (event) =>
    setState('secondDotsColor', event.target.value)
  );
  elements.backgroundColor.addEventListener('input', (event) =>
    setState('backgroundColor', event.target.value)
  );
  elements.cornersSquareColor.addEventListener('input', (event) =>
    setState('cornersSquareColor', event.target.value)
  );
  elements.cornersDotColor.addEventListener('input', (event) =>
    setState('cornersDotColor', event.target.value)
  );
  elements.dotsType.addEventListener('change', (event) => setState('dotsType', event.target.value));
  elements.cornersSquareType.addEventListener('change', (event) =>
    setState('cornersSquareType', event.target.value)
  );
  elements.cornersDotType.addEventListener('change', (event) =>
    setState('cornersDotType', event.target.value)
  );
  elements.size.addEventListener('input', (event) => setState('size', Number(event.target.value)));
  elements.margin.addEventListener('input', (event) =>
    setState('margin', Number(event.target.value))
  );
  elements.logoSize.addEventListener('input', (event) =>
    setState('logoSize', Number(event.target.value) / 100)
  );

  elements.logoFile.addEventListener('change', async (event) => {
    const [file] = event.target.files || [];
    if (!file) return;

    try {
      const logoBadge = await createLogoBadge(file);
      setState('logoImage', logoBadge);
    } catch (error) {
      window.alert('No pude procesar el logo seleccionado.');
    }
  });

  elements.clearLogo.addEventListener('click', () => {
    elements.logoFile.value = '';
    setState('logoImage', '');
  });

  elements.pngDownload.addEventListener('click', () => {
    qrCode.download({ name: 'qr-studio', extension: 'png' });
  });

  elements.svgDownload.addEventListener('click', () => {
    qrCode.download({ name: 'qr-studio', extension: 'svg' });
  });
}

function init() {
  syncLabels();
  initThemePills();
  bindEvents();
  renderQr();
}

init();
