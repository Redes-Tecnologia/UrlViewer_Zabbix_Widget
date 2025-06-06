class WidgetUrlView extends CWidget {
    onInitialize() {
        super.onInitialize();
        this._widgetBody = null;
        this._streamTimeout = null;
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
        contentBox.style.cursor = 'pointer';

        this._widgetBody.appendChild(contentBox);

        this._showSnapshot();

        contentBox.addEventListener('click', () => this._showStreamTemporarily());
    }

    _getSnapshotUrl() {
        const { serverIP, cameraIP, user, password, channel } = this._fields;
        return `http://${serverIP}/camera_snapshot?ip=${cameraIP}&user=${encodeURIComponent(user)}&password=${encodeURIComponent(password)}&channel=${channel}`;
    }

    _getStreamUrl() {
        const tipoIndex = Number(this._fields.tipo);
        const tipos = ['mjpeg', 'mjpg'];
        const tipo = tipos[tipoIndex] ?? 'mjpeg';

        const { serverIP, cameraIP, user, password, channel } = this._fields;
        return `http://${serverIP}/camera_stream?ip=${cameraIP}&user=${encodeURIComponent(user)}&password=${encodeURIComponent(password)}&tipo=${encodeURIComponent(tipo)}&channel=${channel}`;
    }

    _showSnapshot() {
        const contentBox = this._widgetBody.querySelector('#urlContentBox');
        if (!contentBox) return;

        contentBox.innerHTML = '';
        const snapshot = document.createElement('img');
        snapshot.src = this._getSnapshotUrl();
        snapshot.style.width = '100%';
        snapshot.style.height = '100%';
        snapshot.style.objectFit = 'contain';
        snapshot.alt = 'Snapshot da câmera';
        contentBox.appendChild(snapshot);
    }

    _showStreamTemporarily(duration = 15000) { // 15 segundos
        const contentBox = this._widgetBody.querySelector('#urlContentBox');
        if (!contentBox) return;

        clearTimeout(this._streamTimeout); // evita múltiplos timeouts

        contentBox.innerHTML = '';
        const stream = document.createElement('img');
        stream.src = this._getStreamUrl();
        stream.style.width = '100%';
        stream.style.height = '100%';
        stream.style.objectFit = 'contain';
        stream.alt = 'Stream da câmera';
        contentBox.appendChild(stream);

        // Voltar para snapshot depois de alguns segundos
        this._streamTimeout = setTimeout(() => {
            this._showSnapshot();
        }, duration);
    }
}

if (typeof addWidgetClass === 'function') {
    addWidgetClass(WidgetUrlView);
}
