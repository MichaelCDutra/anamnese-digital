import emailjs from '@emailjs/browser';
import { Validation } from './validation.js';
import { Nav } from './navigation.js';
import { Sig } from './sig.js';

export const Email = {
    init: () => {
        const key = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "BYc1vrVgbj9Bwf32d";
        emailjs.init(key);
    },
    run: (e) => {
        e.preventDefault();
        const errAt = Validation.checkAll(); 
        if(errAt > 0) { Nav.go(errAt); return; }
        
        if(Sig.empty()) { 
            alert("A rubrica digital é obrigatória para validar os termos."); 
            return; 
        }

        const btn = document.getElementById('btn-sub'); 
        const sp = document.getElementById('btn-sp');
        const txt = document.getElementById('btn-txt');
        
        if(btn) btn.disabled = true;
        if(sp) sp.style.display = 'inline-block'; 
        if(txt) txt.innerText = '';

        const fd = new FormData(document.getElementById('appForm'));
        const body = `✅ PACIENTE: ${fd.get('nome')} | WA: ${fd.get('wa')}\n🎂 NASC: ${fd.get('nasc')} ` + 
                     (fd.get('responsavel') ? `(Resp: ${fd.get('responsavel')})` : '') + 
                     `\n⚠️ ALERGIAS: ${fd.get('alergia') || 'Não'} (${fd.get('al_obs') || '-'})` +
                     `\n🤱 GESTANTE: ${fd.get('gestante') || 'Não'} (${fd.get('gest_obs') || '-'})` +
                     `\n🎯 OBJETIVO: ${fd.get('objetivo') || 'Consulta'}`;
        
        const hFs = window.AppGlobal.imgs.map(ig => `<img src="${ig.data}" style="max-width:300px; margin:5px; border-radius:8px;">`).join('');

        const p = {
            cli_nome: fd.get('nome'), 
            cli_whatsapp: fd.get('wa'), 
            cli_servico: window.AppGlobal.type.toUpperCase(),
            cli_queixa: fd.get('queixa'), 
            cli_info: body, 
            cli_data: new Date().toLocaleString(),
            cli_sig: `<img src="${Sig.cv.toDataURL()}" style="height:80px;"/>`, 
            cli_midia: hFs
        };

        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_dqw2f56";
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_yp8juww";

        emailjs.send(serviceId, templateId, p)
        .then(() => Email.ok())
        .catch((err) => {
            console.error("Erro no envio de email:", err);
            Email.ok(); // Soft fallback para não travar o fluxo da clínica
        });
    },
    ok: () => { 
        window.AppGlobal.dirty = false; 
        localStorage.removeItem('CQ_PRO_Draft'); 
        Nav.go(6); 
    }
};
