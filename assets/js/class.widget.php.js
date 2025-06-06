class WidgetUrlView extends CWidget {
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

    _showContent() {
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
                contentBox.innerHTML = '<p style="color: white;">Campos obrigatórios não configurados.</p>';
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

        const container = document.createElement('div');
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.position = 'relative';
        container.style.cursor = 'pointer';

        const img = document.createElement('img');
        img.src = staticImgUrl;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'contain';

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
        overlay.style.pointerEvents = 'none';

        container.appendChild(img);
        container.appendChild(overlay);
        contentBox.appendChild(container);

        container.addEventListener('click', () => {
            const liveImg = document.createElement('img');
            liveImg.src = streamUrl;
            liveImg.style.width = '100%';
            liveImg.style.height = '100%';
            liveImg.style.objectFit = 'contain';

            contentBox.innerHTML = '';
            contentBox.appendChild(liveImg);
        });
    }

}

if (typeof addWidgetClass === 'function') {
    addWidgetClass(WidgetUrlView);
}
