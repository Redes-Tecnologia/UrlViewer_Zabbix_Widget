class WidgetUrlView extends CWidget {
    onInitialize() {
        super.onInitialize();
        this._widgetBody = null;
        this._streamTimeout = null;
        this._isStreaming = false;

        // Escuta eventos de outros widgets
        window.addEventListener('cameraWidgetActivated', (e) => {
            if (e.detail.widgetId !== this._id && this._isStreaming) {
                this._stopStream(); // desativa o stream se não for este
            }
        });
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

        this._isStreaming = false;
        contentBox.innerHTML = '';

        const snapshot = document.createElement('img');
        snapshot.src = this._getSnapshotUrl();
        snapshot.style.width = '100%';
        snapshot.style.height = '100%';
        snapshot.style.objectFit = 'contain';
        snapshot.alt = 'Snapshot da câmera';
        contentBox.appendChild(snapshot);
    }

    _stopStream() {
        clearTimeout(this._streamTimeout);
        this._showSnapshot();
    }

    _showStreamTemporarily(duration = 15000) {
        const contentBox = this._widgetBody.querySelector('#urlContentBox');
        if (!contentBox) return;

        // Notifica outros widgets que este foi ativado
        window.dispatchEvent(new CustomEvent('cameraWidgetActivated', {
            detail: { widgetId: this._id }
        }));

        clearTimeout(this._streamTimeout);
        this._isStreaming = true;

        contentBox.innerHTML = '';
        const stream = document.createElement('img');
        stream.src = this._getStreamUrl();
        stream.style.width = '100%';
        stream.style.height = '100%';
        stream.style.objectFit = 'contain';
        stream.alt = 'Stream da câmera';
        contentBox.appendChild(stream);

        this._streamTimeout = setTimeout(() => {
            this._stopStream();
        }, duration);
    }
}
