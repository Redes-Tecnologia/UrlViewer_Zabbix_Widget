<?php declare(strict_types = 0);

?>//<script>

window.widget_openai_form = new class {

    #form = undefined;

    init() {
        this.#form = document.getElementById('widget-dialogue-form');
        this.#form.querySelector('[name="service"]')?.addEventListener('change', this.setTipo.bind(this));

        this.addLogo();
    }

    addLogo() {
        const el = document.createElement('div');
        el.classList.add('logo-redes');

        this.#form.insertBefore(el, this.#form.firstChild);
    }

    /*setEndpoint(e) {
        const value = e.target.value;

        const endpoint = this.#form.querySelector('[name="endpoint"]');

        switch(value) {
            case '0':
                endpoint.value = 'https://api.openai.com/v1/chat/completions';
                break;
            case '1':
                endpoint.value = 'https://api.deepseek.com/chat/completions';
                break;
            default:
                endpoint.value = '';
        }
    }*/

    setTipo(e) {
        const value = e.target.value;

        const tipo = this.#form.querySelector('[name="tipo"]');

        switch(value) {
            case '0':
                tipo.value = 'mjepg';
                break;
            case '1':
                tipo.value = 'mjpg';
                break;
            default:
                tipo.value = '';
        }
    }
};
