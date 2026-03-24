import CryptoJS from 'crypto-js';
import { UI } from './ui.js';
import { Validation } from './validation.js';

const G = {
    cur: 1, type: 'facial', mK: 'cln_cq_aes_v21', lsK: 'CQ_PRO_Draft',
    deb: null, dirty: false, imgs: []
};

export const Security = {
    encrypt: (d) => CryptoJS.AES.encrypt(JSON.stringify(d), G.mK).toString(),
    decrypt: (c) => { try { return JSON.parse(CryptoJS.AES.decrypt(c, G.mK).toString(CryptoJS.enc.Utf8)); } catch(e) { return null; } },
    save: () => {
        if(window.AppGlobal.cur >= 5) return;
        const f = new FormData(document.getElementById('appForm'));
        let d = { _t: window.AppGlobal.type }; f.forEach((v,k)=> { if(typeof v==='string') d[k]=v; });
        localStorage.setItem(G.lsK, Security.encrypt(d));
        window.AppGlobal.dirty = true; 
        UI.toast();
    },
    load: () => {
        const r = localStorage.getItem(G.lsK); if(!r) return;
        const d = Security.decrypt(r); if(!d) return;
        Object.keys(d).forEach(k => {
            if(k === '_t') { UI.setFoco(d[k]); return; }
            const el = document.querySelector(`[name="${k}"]`);
            if(el && el.type!=='file') {
                el.value = d[k]; 
                if(el.required) Validation.check(el);
                if(k==='alergia') UI.cond(el, 'w-alergia', 'Sim');
                if(k==='gestante') UI.cond(el, 'w-gestante', 'Sim');
                if(k==='nasc') Validation.age(el);
            }
        });
    },
    warn: (e) => { if(window.AppGlobal.dirty && window.AppGlobal.cur < 6) { e.preventDefault(); e.returnValue = ''; } }
};

export { G };
