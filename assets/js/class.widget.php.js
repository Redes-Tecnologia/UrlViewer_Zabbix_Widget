class WidgetUrlView extends CWidget {
    urlField = this._fields.url;

    onInitialize() {
        super.onInitialize();
        this._widgetBody = null;
    }

    setContents(response) {
        if (!this._urlInput) return;

        super.setContents(response);
        this._widgetBody = this._body;
        this._widgetBody.style.padding = '0';

        if (!this.urlField) return;

        /*if (!contentBox || !container) {
            console.error("Elementos container ou contentBox não encontrados.");
            return;
        }*/

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

        // Atualiza a imagem a cada 1 segundo
        const updateInterval = 1000; // milissegundos

        // Função para atualizar a imagem
        const updateImage = () => {
            img.src = url + '?_=' + new Date().getTime(); // Cache buster
        };

        // Começa a atualizar
        updateImage();
        setInterval(updateImage, updateInterval);

    }
}

if (typeof addWidgetClass === 'function') {
    addWidgetClass(WidgetUrlView); // Se você renomear a classe, atualize aqui também
}