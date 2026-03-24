/**
 * Carolina Queiroz Estética - Anamnese Digital V3.0
 * Padrão de Mercado: Vanilla JS + Vite + ES Modules
 */

import '../css/style.css';
import { Security } from './modules/security.js';
import { Validation } from './modules/validation.js';
import { UI } from './modules/ui.js';
import { Nav } from './modules/navigation.js';
import { Media } from './modules/media.js';
import { Sig } from './modules/sig.js';
import { Email } from './modules/email.js';
import { PDF } from './modules/pdf.js';

// Estado Global (Exposto para o Window apenas para facilitar eventos inline do HTML herdado)
window.AppGlobal = {
    cur: 1, 
    type: 'facial', 
    deb: null, 
    dirty: false, 
    imgs: []
};

// Interface Pública (Herança da versão 2.2 para evitar reescrever todo o HTML)
window.App = {
    Nav, 
    UI, 
    Media, 
    Sig, 
    PDF, 
    Email,
    Security
};

const init = () => {
    // Inicialização de Módulos
    Email.init();
    Sig.init();
    Security.load();

    // Listeners de Eventos Globais
    const appForm = document.getElementById('appForm');
    if (appForm) {
        appForm.addEventListener('input', (e) => { 
            Validation.check(e.target); 
            // Trigger auto-save on input
            clearTimeout(window.AppGlobal.deb);
            window.AppGlobal.deb = setTimeout(Security.save, 1000);
        });
    }

    const waInput = document.getElementById('wa');
    if (waInput) waInput.addEventListener('input', Validation.phone);

    const nascInput = document.getElementById('nasc');
    if (nascInput) nascInput.addEventListener('input', (e) => Validation.age(e.target));

    const alergiaSelect = document.getElementById('alergia');
    if (alergiaSelect) {
        alergiaSelect.addEventListener('change', (e) => UI.cond(e.target, 'w-alergia', 'Sim'));
    }

    const gestanteSelect = document.getElementById('gestante');
    if (gestanteSelect) {
        gestanteSelect.addEventListener('change', (e) => UI.cond(e.target, 'w-gestante', 'Sim'));
    }

    const tcleCheckbox = document.getElementById('check-tcle');
    if (tcleCheckbox) {
        tcleCheckbox.addEventListener('change', (e) => Sig.lock(e.target));
    }

    const fileInput = document.getElementById('file-in');
    if (fileInput) {
        fileInput.addEventListener('change', (e) => Media.listen(e.target));
    }

    window.addEventListener('beforeunload', Security.warn);
    
    console.log("💎 Anamnese Premium V3.0 inicializada com sucesso!");
};

document.addEventListener("DOMContentLoaded", init);
