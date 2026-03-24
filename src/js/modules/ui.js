import { Validation } from './validation.js';
import { Security } from './security.js';

export const UI = {
    toast: () => { 
        const t = document.getElementById('toast'); 
        if(!t) return;
        t.classList.add('show'); 
        setTimeout(() => t.classList.remove('show'), 2000); 
    },
    cond: (s, id, x) => { 
        const w = document.getElementById(id);
        if(!w) return;
        const i = w.querySelector('input') || w.querySelector('textarea');
        if(s.value === x) { 
            w.style.display = 'block'; 
            if(i) i.required = true; 
        } 
        else { 
            w.style.display = 'none'; 
            if(i) { 
                i.required = false; 
                i.value = ''; 
                Validation.check(i); 
            }
        }
    },
    setFoco: (t) => {
        window.AppGlobal.type = t;
        const chf = document.getElementById('ch-f');
        const chc = document.getElementById('ch-c');
        if(chf) chf.classList.toggle('active', t === 'facial');
        if(chc) chc.classList.toggle('active', t === 'corporal');
        
        const df = document.getElementById('df');
        const dc = document.getElementById('dc');
        if(t === 'facial') { 
            if(df) df.style.display = 'block'; 
            if(dc) {
                dc.style.display = 'none'; 
                dc.querySelectorAll('input').forEach(i => i.value = ''); 
            }
        }
        else { 
            if(dc) dc.style.display = 'block'; 
            if(df) {
                df.style.display = 'none'; 
                df.querySelectorAll('select,input').forEach(i => i.value = ''); 
            }
        }
        clearTimeout(window.AppGlobal.deb); 
        window.AppGlobal.deb = setTimeout(Security.save, 500);
    },
    sendWA: () => {
        const fd = new FormData(document.getElementById('appForm'));
        const msg = `✅ FICHA ENVIADA: ${fd.get('nome')}\n🎯 FOCO: ${window.AppGlobal.type.toUpperCase()}\n_O prontuário criptografado já está disponível para análise da Dra. Carolina._`;
        window.open(`https://wa.me/5531994807576?text=${encodeURIComponent(msg)}`);
    }
};
