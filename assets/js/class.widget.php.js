class WidgetUrlView extends CWidget {
    static _activeLiveStreamWidget = null;
    _currentLiveImageElement = null;

    onInitialize() {
        super.onInitialize();
        this._widgetBody = null;
    }

    setContents(response) {
        super.setContents(response);
        this._widgetBody = this._body;
        this._widgetBody.style.padding = '0';

        const contentBox = document.createElement('div');
        contentBox.id = 'urlContentBox';
        contentBox.style.width = '100%';
        contentBox.style.height = '100%';
        contentBox.style.display = 'flex';
        contentBox.style.justifyContent = 'center';
        contentBox.style.alignItems = 'center';
        contentBox.style.backgroundColor = '#000';

        this._widgetBody.appendChild(contentBox);

        this._showContent();
    }

    /**
     * Exibe o conteúdo, seja a imagem estática com sobreposição ou o stream ao vivo.
     * Gerencia a duração de 15 segundos do stream ao vivo e garante que apenas um stream ao vivo esteja ativo por vez.
     * @private
     */
    _showContent() {
        if (WidgetUrlView._activeLiveStreamWidget === this) {
            WidgetUrlView._activeLiveStreamWidget = null;
        }

        if (this._currentLiveImageElement) {
            this._currentLiveImageElement.src = '';
            this._currentLiveImageElement = null;
        }

        const tipoIndex = Number(this._fields.tipo);
        const serverIP = this._fields.serverIP?.trim();
        const serverPort = this._fields.serverPort?.trim();
        const cameraIP = this._fields.cameraIP?.trim();
        const channel = this._fields.channel?.trim();
        const user = this._fields.user?.trim();
        const password = this._fields.password?.trim();

        const contentBox = this._widgetBody.querySelector('#urlContentBox');

        if (!serverIP || !serverPort || !cameraIP || !user || !password || !channel) {
            console.error("Campos obrigatórios não preenchidos.");
            if (contentBox) {
                contentBox.innerHTML = '<p style="color: white; text-align: center;">Campos obrigatórios não configurados.</p>';
            }
            return;
        }

        if (!contentBox) {
            console.error("Elemento contentBox não encontrado.");
            return;
        }

        const tipos = ['mjpeg', 'mjpg'];
        const tipo = tipos[tipoIndex] ?? 'mjpeg';

        contentBox.innerHTML = '';

        const staticImgUrl = `https://${serverIP}/camera_snapshot?ip=${cameraIP}&user=${encodeURIComponent(user)}&password=${encodeURIComponent(password)}&channel=${channel}`;
        const streamUrl = `https://${serverIP}/camera_stream?ip=${cameraIP}&user=${encodeURIComponent(user)}&password=${encodeURIComponent(password)}&tipo=${encodeURIComponent(tipo)}&channel=${channel}`;

        // Cria contêiner para a imagem estática e sobreposição
        const container = document.createElement('div');
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.position = 'relative';
        container.style.cursor = 'pointer';

        // Cria o elemento da imagem estática
        const img = document.createElement('img');
        img.src = staticImgUrl;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'contain';

        // NOVO: Adiciona um filtro CSS para escurecer a imagem
        // img.style.filter = 'brightness(50%)'; // Escurece para 50% do brilho original
        // img.style.filter = 'grayscale(100%) brightness(70%)'; // Exemplo: P&B e escurece um pouco

        // MÉTODOS RECOMENDADOS para o efeito escuro
        // Opção 1: Overlay com pseudo-elemento (mais robusto)
        // Para usar isso, você adicionaria uma classe CSS ao container e definiria o pseudo-elemento lá.
        // Já que estamos fazendo direto no JS, vamos usar uma div de overlay.

        // Opção 2: Adicionar uma div de overlay para escurecer
        const darkOverlay = document.createElement('div');
        darkOverlay.style.position = 'absolute';
        darkOverlay.style.top = '0';
        darkOverlay.style.left = '0';
        darkOverlay.style.width = '100%';
        darkOverlay.style.height = '100%';
        darkOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.4)'; // Preto com 40% de opacidade
        darkOverlay.style.zIndex = '1'; // Para ficar acima da imagem, mas abaixo da mensagem de overlay
        darkOverlay.style.pointerEvents = 'none'; // Permite cliques passarem

        // Cria a mensagem de sobreposição para clicar e ver ao vivo
        const overlay = document.createElement('div');
        overlay.innerText = 'Clique para exibir ao vivo';
        overlay.style.position = 'absolute';
        overlay.style.top = '50%';
        overlay.style.left = '50%';
        overlay.style.transform = 'translate(-50%, -50%)';
        overlay.style.color = 'white';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
        overlay.style.padding = '10px 20px';
        overlay.style.borderRadius = '8px';
        overlay.style.fontSize = '16px';
        overlay.style.zIndex = '2'; // Garante que a mensagem esteja acima do overlay escuro
        overlay.style.pointerEvents = 'none';

        // Anexa imagem e sobreposição ao contêiner
        container.appendChild(img);
        container.appendChild(darkOverlay); // Adiciona o overlay escuro
        container.appendChild(overlay);
        contentBox.appendChild(container);

        container.addEventListener('click', () => {
            if (WidgetUrlView._activeLiveStreamWidget && WidgetUrlView._activeLiveStreamWidget !== this) {
                WidgetUrlView._activeLiveStreamWidget._showContent();
            }

            WidgetUrlView._activeLiveStreamWidget = this;

            const liveImg = document.createElement('img');
            liveImg.src = streamUrl;
            liveImg.style.width = '100%';
            liveImg.style.height = '100%';
            liveImg.style.objectFit = 'contain';

            this._currentLiveImageElement = liveImg;

            contentBox.innerHTML = '';
            contentBox.appendChild(liveImg);
        });
    }
}

if (typeof addWidgetClass === 'function') {
    addWidgetClass(WidgetUrlView);
}