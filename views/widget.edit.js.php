<?php declare(strict_types = 0);

?>//<script>
window.widget_urlviewer_form = new class {
    #form = undefined;
    init() {
        this.#form = document.getElementById('widget-dialogue-form');
        this.addLogo();
    }
    addLogo() {
        const el = document.createElement('div');
        el.classList.add('logo-redes');
        this.#form.insertBefore(el, this.#form.firstChild);
    }
};
