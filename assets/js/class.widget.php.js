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
        const url = this._fields.url?.trim();
        const contentBox = this._widgetBody.querySelector('#urlContentBox');

        if (!url) {
            console.error("URL não definida no campo.");
            contentBox.innerHTML = '<p style="color: white;">URL não configurada.</p>';
            return;
        }

        if (!contentBox) {
            console.error("Elemento contentBox não encontrado.");
            return;
        }

        contentBox.innerHTML = '';

        const img = document.createElement('img');
        img.src = url; // MJPEG stream direto
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'contain';
        img.alt = 'Stream da câmera';

        contentBox.appendChild(img);
    }
}

if (typeof addWidgetClass === 'function') {
    addWidgetClass(WidgetUrlView);
}
