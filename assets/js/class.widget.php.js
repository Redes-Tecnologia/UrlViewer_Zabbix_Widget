class WidgetUrlView extends CWidget {
    // Variável estática para rastrear a instância do widget de stream ao vivo atualmente ativa.
    // Isso garante que apenas um stream de câmera esteja ativo por vez em todas as instâncias do WidgetUrlView.
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
        // Se esta instância era a que estava transmitindo ao vivo, remove-a do rastreador estático
        if (WidgetUrlView._activeLiveStreamWidget === this) {
            WidgetUrlView._activeLiveStreamWidget = null;
        }

        // Antes de mudar o conteúdo, limpa a fonte do elemento de imagem do stream ao vivo anterior
        // para forçar o navegador a encerrar a conexão e liberar recursos.
        if (this._currentLiveImageElement) {
            this._currentLiveImageElement.src = ''; // Interrompe explicitamente o stream
            this._currentLiveImageElement = null; // Limpa a referência
        }

        const tipoIndex = Number(this._fields.tipo);
        const serverIP = this._fields.serverIP?.trim();
        const serverPort = this._fields.serverPort?.trim();
        const cameraIP = this._fields.cameraIP?.trim();
        const channel = this._fields.channel?.trim();
        const user = this._fields.user?.trim();
        const password = this._fields.password?.trim();

        const contentBox = this._widgetBody.querySelector('#urlContentBox');

        // Verifica campos obrigatórios e exibe erro se estiverem faltando
        if (!serverIP || !serverPort || !cameraIP || !user || !password || !channel) {
            console.error("Campos obrigatórios não preenchidos.");
            if (contentBox) {
                contentBox.innerHTML = '<p style="color: white; text-align: center;">Campos obrigatórios não configurados.</p>';
            }
            return;
        }

        // Garante que o elemento contentBox exista
        if (!contentBox) {
            console.error("Elemento contentBox não encontrado.");
            return;
        }

        const tipos = ['mjpeg', 'mjpg'];
        const tipo = tipos[tipoIndex] ?? 'mjpeg'; // Padrão para 'mjpeg' se tipoIndex for inválido

        contentBox.innerHTML = ''; // Limpa conteúdo anterior

        // Constrói URLs para imagem estática e stream ao vivo
        const staticImgUrl = `https://${serverIP}/camera_snapshot?ip=${cameraIP}&user=${encodeURIComponent(user)}&password=${encodeURIComponent(password)}&channel=${channel}`;
        const streamUrl = `https://${serverIP}/camera_stream?ip=${cameraIP}&user=${encodeURIComponent(user)}&password=${encodeURIComponent(password)}&tipo=${encodeURIComponent(tipo)}&channel=${channel}`;

        // Cria contêiner para a imagem estática e sobreposição
        const container = document.createElement('div');
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.position = 'relative';
        container.style.cursor = 'pointer'; // Indica que é clicável

        // Cria o elemento da imagem estática
        const img = document.createElement('img');
        img.src = staticImgUrl;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'contain'; // Garante que a imagem se ajuste sem distorção

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
        overlay.style.pointerEvents = 'none'; // Permite que os cliques passem para o contêiner

        // Anexa imagem e sobreposição ao contêiner
        container.appendChild(img);
        container.appendChild(overlay);
        contentBox.appendChild(container); // Adiciona contêiner à caixa de conteúdo principal

        // Adiciona ouvinte de evento de clique para alternar para o stream ao vivo
        container.addEventListener('click', () => {
            // Se já houver um widget de stream ao vivo ativo, e não for esta instância,
            // força o outro widget a voltar para a imagem estática.
            if (WidgetUrlView._activeLiveStreamWidget && WidgetUrlView._activeLiveStreamWidget !== this) {
                WidgetUrlView._activeLiveStreamWidget._showContent(); // Reverte o outro widget
            }

            // Define esta instância como a atualmente ativa para o stream ao vivo
            WidgetUrlView._activeLiveStreamWidget = this;

            const liveImg = document.createElement('img');
            liveImg.src = streamUrl;
            liveImg.style.width = '100%';
            liveImg.style.height = '100%';
            liveImg.style.objectFit = 'contain';

            this._currentLiveImageElement = liveImg;

            contentBox.innerHTML = ''; // Limpa a imagem estática e a sobreposição
            contentBox.appendChild(liveImg); // Exibe o stream ao vivo
        });
    }
}

// Registra a classe do widget se a função addWidgetClass estiver disponível
if (typeof addWidgetClass === 'function') {
    addWidgetClass(WidgetUrlView);
}
