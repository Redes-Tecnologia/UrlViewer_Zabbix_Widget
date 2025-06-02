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
        const user = this._fields.user?.trim();
        const password = this._fields.password?.trim();

        const contentBox = this._widgetBody.querySelector('#urlContentBox');

        if (!serverIP || !serverPort || !cameraIP || !user || !password) {
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
        const tipo = tipos[tipoIndex] ?? 'mjpeg'; // default mjpeg

        contentBox.innerHTML = '';

        const url = `http://${serverIP}:${serverPort}/camera_stream?ip=${cameraIP}&user=${encodeURIComponent(user)}&password=${encodeURIComponent(password)}&tipo=${encodeURIComponent(tipo)}`;

        const img = document.createElement('img');
        img.src = url;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'contain';
        img.alt = 'Camera Stream';

        contentBox.appendChild(img);
    }
}

if (typeof addWidgetClass === 'function') {
    addWidgetClass(WidgetUrlView);
}
