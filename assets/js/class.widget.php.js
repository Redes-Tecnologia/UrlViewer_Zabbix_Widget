class WidgetUrlView extends CWidget {

    

    // O onInitialize agora fica mais limpo, apenas chama o da classe pai.

    onInitialize() {

        super.onInitialize();

    }



    onUpdate() {

        this.setContents();

    }
    setContents() {
    // A manipulação do estilo foi movida para o início do setContents.
    // Aqui, temos certeza que 'this._body' já existe.
    this._body.style.padding = '0';
    this._body.style.overflow = 'hidden';
    this._body.innerHTML = '';

    // Lê a URL do campo 'url'
    // ***** LINHA CORRIGIDA *****
    const url = this._fields.URL;

    if (url && url.trim() !== '') {
        let fullUrl = url.trim();
        // Garante que a URL tenha um protocolo
        if (!fullUrl.toLowerCase().startsWith('http://') && !fullUrl.toLowerCase().startsWith('https://')) {
            fullUrl = 'http://' + fullUrl;
        }

        const iframe = document.createElement('iframe');
        iframe.src = fullUrl;
        iframe.title = 'Visualização da URL: ' + url;
        iframe.style.cssText = 'width: 100%; height: 100%; border: none;';
        iframe.sandbox = 'allow-forms allow-scripts allow-same-origin allow-popups allow-presentation';
        
        iframe.onerror = () => {
            this._body.innerHTML = '<div style="padding: 20px; text-align: center; color: red;">Não foi possível carregar a URL.</div>';
        };

        this._body.appendChild(iframe);
    } else {
        this._body.innerHTML = '<div style="padding: 20px; text-align: center;">Por favor, configure uma URL na edição do widget.</div>';
    }
}

}



if (typeof addWidgetClass === 'function') {

    addWidgetClass('url_viewer', WidgetUrlView);

}
