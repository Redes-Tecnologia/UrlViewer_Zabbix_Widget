class WidgetUrlView extends CWidget {

    onInitialize() {
        super.onInitialize();
        this._urlInput = null;
        this._openButton = null;
        this._contentContainer = null;
        this._widgetBody = null;
    }

    setContents(response) {
        if (!this._widgetBody) {
            super.setContents(response);
            this._widgetBody = this._body;
            this._widgetBody.style.padding = '0';

            const style = document.createElement('style');
            style.textContent = `
                .widget-camera-view-body {
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                }
                .url-widget-wrapper {
                    flex-grow: 1;
                    background-color: #070707;
                    padding: 20px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    box-sizing: border-box;
                    height: 100%;
                    transition: padding 0.3s ease;
                }
                .url-content-box {
                    background-color: #1e1e1e;
                    border: 1px solid #333;
                    border-radius: 8px;
                    padding: 25px 30px;
                    width: 100%;
                    max-width: 500px;
                    box-shadow: 0 4px 10px rgba(0,0,0,0.5);
                    text-align: center;
                    box-sizing: border-box;
                    flex-shrink: 0;
                    transition: background-color 0.3s ease, padding 0.3s ease, border 0.3s ease, box-shadow 0.3s ease, max-width 0.3s ease;
                     height: auto;
                }
                .url-content-box h2 { margin-top: 0; margin-bottom: 15px; color: #ffffff; font-size: 18px; }
                .url-content-box p { font-size: 14px; color: #ffffff; margin-bottom: 25px; }
                .url-content-box input[type="text"] {
                    padding: 10px 14px; font-size: 14px; border: 1px solid #555; border-radius: 5px;
                    width: 100%; max-width: 300px; margin-bottom: 20px;
                    background-color: #2c2c2c; color: #ffffff; box-sizing: border-box; text-align: center;
                }
                .url-content-box input::placeholder { color: #888; }
                .url-content-box button {
                    padding: 15px 24px; font-size: 14px; font-weight: bold; color: white;
                    background-color: #2385F3; border: none; border-radius: 5px; cursor: pointer;
                    transition: background-color 0.3s ease; box-sizing: border-box;
                    display: inline-flex; align-items: center; justify-content: center; text-align: center;
                }
                .url-content-box button:hover { background-color: #000000; }
                .url-content-box iframe {
                    width: 100%;
                    height: 100%;
                    border: none;
                    display: block;
                }
            `;
            this._widgetBody.appendChild(style);
            this._widgetBody.classList.add('widget-camera-view-body');

            this._widgetBody.innerHTML += `
                <div class="url-widget-wrapper" id="urlWidgetContainer">
                    <div class="url-content-box" id="urlContentBox">
                        <h2>Visualizador de URL</h2>
                        <p>Digite a URL para visualizá-la aqui:</p>
                        <input type="text" id="urlInputWidget" placeholder="Ex: https://www.exemplo.com">
                        <button id="openUrlButtonWidget" type="button">Abrir URL</button>
                    </div>
                </div>
            `;

            this._urlInput = this._widgetBody.querySelector('#urlInputWidget');
            this._openButton = this._widgetBody.querySelector('#openUrlButtonWidget');

            if (this._openButton) {
                this._openButton.addEventListener('click', this._showContent.bind(this));
            }
            if (this._urlInput) {
                this._urlInput.addEventListener('keypress', (event) => {
                    if (event.key === 'Enter') {
                        event.preventDefault();
                        this._showContent();
                    }
                });
            }
        }
    }

    _showContent() {
        if (!this._urlInput) return;

        let url = this._urlInput.value.trim();
        const contentBox = this._widgetBody.querySelector('#urlContentBox');
        const container = this._widgetBody.querySelector('#urlWidgetContainer');

        if (!contentBox || !container) {
            console.error("Elementos container ou contentBox não encontrados.");
            return;
        }

        if (url) {
            if (!url.toLowerCase().startsWith('http://') && !url.toLowerCase().startsWith('https://')) {
                url = 'http://' + url;
            }
            console.log("Abrindo URL:", url);

            contentBox.innerHTML = '';

            contentBox.style.maxWidth = 'none';
            contentBox.style.padding = '0';
            contentBox.style.border = 'none';
            contentBox.style.boxShadow = 'none';
            contentBox.style.backgroundColor = '#000';
            contentBox.style.height = '100%';
            contentBox.style.display = 'flex';
            contentBox.style.flexDirection = 'column';
            contentBox.style.justifyContent = 'center';
            contentBox.style.alignItems = 'center';

            container.style.padding = '0';
            container.style.alignItems = 'stretch';

            const img = document.createElement('img');
            img.style.maxWidth = '100%';
            img.style.maxHeight = '100%';
            img.style.objectFit = 'contain';
            img.alt = 'Snapshot da câmera';
            contentBox.appendChild(img);

            //tualiza a imagem a cada 1 segundo
            const updateInterval = 1000; // milissegundos

            // Função para atualizar a imagem
            const updateImage = () => {
                img.src = url + '?_=' + new Date().getTime(); // Cache buster
            };

            // Começa a atualizar
            updateImage();
            const intervalId = setInterval(updateImage, updateInterval);

            //impa o intervalo se o usuário quiser mudar a URL
            this._openButton.addEventListener('click', () => clearInterval(intervalId));
            this._urlInput.addEventListener('keypress', (event) => {
                if (event.key === 'Enter') {
                    clearInterval(intervalId);
                }
            });

        } else {
            alert('Por favor, digite uma URL válida.');
        }
    }



    escapeHtml(unsafe) {
        if (typeof unsafe !== 'string') {
            console.warn("escapeHtml recebeu um valor não-string:", unsafe);
            return '';
        }
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
}

if (typeof addWidgetClass === 'function') {
    addWidgetClass(WidgetCameraView); // Se você renomear a classe, atualize aqui também
    console.log("WidgetCameraView (modificado para URL) registrado com sucesso.");
} else {
    console.error("Função addWidgetClass não encontrada. Não foi possível registrar WidgetCameraView.");
}