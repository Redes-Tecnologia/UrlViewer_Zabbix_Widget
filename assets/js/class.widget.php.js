class WidgetUrlView extends CWidget {
    // Private variable to hold the timeout ID for the live stream
    _liveStreamTimeoutId = null;

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
     * Displays the content, either static image with overlay or live stream.
     * Manages the 15-second live stream duration.
     * @private
     */
    _showContent() {
        // Clear any existing live stream timeout if _showContent is called again
        if (this._liveStreamTimeoutId) {
            clearTimeout(this._liveStreamTimeoutId);
            this._liveStreamTimeoutId = null;
        }

        const tipoIndex = Number(this._fields.tipo);
        const serverIP = this._fields.serverIP?.trim();
        const serverPort = this._fields.serverPort?.trim();
        const cameraIP = this._fields.cameraIP?.trim();
        const channel = this._fields.channel?.trim();
        const user = this._fields.user?.trim();
        const password = this._fields.password?.trim();

        const contentBox = this._widgetBody.querySelector('#urlContentBox');

        // Check for required fields and display an error if any are missing
        if (!serverIP || !serverPort || !cameraIP || !user || !password || !channel) {
            console.error("Campos obrigatórios não preenchidos.");
            if (contentBox) {
                contentBox.innerHTML = '<p style="color: white; text-align: center;">Campos obrigatórios não configurados.</p>';
            }
            return;
        }

        // Ensure contentBox element exists
        if (!contentBox) {
            console.error("Elemento contentBox não encontrado.");
            return;
        }

        const tipos = ['mjpeg', 'mjpg'];
        const tipo = tipos[tipoIndex] ?? 'mjpeg'; // Default to 'mjpeg' if tipoIndex is invalid

        contentBox.innerHTML = ''; // Clear previous content

        // Construct URLs for static image and live stream
        const staticImgUrl = `https://${serverIP}/camera_snapshot?ip=${cameraIP}&user=${encodeURIComponent(user)}&password=${encodeURIComponent(password)}&channel=${channel}`;
        const streamUrl = `https://${serverIP}/camera_stream?ip=${cameraIP}&user=${encodeURIComponent(user)}&password=${encodeURIComponent(password)}&tipo=${encodeURIComponent(tipo)}&channel=${channel}`;

        // Create container for the static image and overlay
        const container = document.createElement('div');
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.position = 'relative';
        container.style.cursor = 'pointer'; // Indicate it's clickable

        // Create the static image element
        const img = document.createElement('img');
        img.src = staticImgUrl;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'contain'; // Ensure image fits without distortion

        // Create the overlay message for clicking to view live
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
        overlay.style.pointerEvents = 'none'; // Allow clicks to pass through to the container

        // Append image and overlay to the container
        container.appendChild(img);
        container.appendChild(overlay);
        contentBox.appendChild(container); // Add container to the main content box

        // Add click event listener to switch to live stream
        container.addEventListener('click', () => {
            // Clear any existing timeout before starting a new stream
            if (this._liveStreamTimeoutId) {
                clearTimeout(this._liveStreamTimeoutId);
                this._liveStreamTimeoutId = null;
            }

            const liveImg = document.createElement('img');
            liveImg.src = streamUrl;
            liveImg.style.width = '100%';
            liveImg.style.height = '100%';
            liveImg.style.objectFit = 'contain';

            contentBox.innerHTML = ''; // Clear the static image and overlay
            contentBox.appendChild(liveImg); // Display the live stream

            // Set a timeout to revert to the static image after 15 seconds (15000 milliseconds)
            this._liveStreamTimeoutId = setTimeout(() => {
                this._showContent(); // Call _showContent again to revert to static view
            }, 15000); // 15 seconds
        });
    }
}

// Register the widget class if addWidgetClass function is available
if (typeof addWidgetClass === 'function') {
    addWidgetClass(WidgetUrlView);
}
