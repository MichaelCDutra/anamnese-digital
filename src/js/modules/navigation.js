import { Validation } from './validation.js';
import { Sig } from './sig.js';

export const Nav = {
    go: (n) => {
        if(n > window.AppGlobal.cur) {
            for(let i = window.AppGlobal.cur; i < n; i++) {
                if(!Validation.step(i)) { Nav.jumpTo(i); return; }
            }
        }
        Nav.jumpTo(n);
    },
    jumpTo: (n) => {
        document.querySelectorAll('.panel, .nav-link, .m-dot').forEach(el => el.classList.remove('active'));
        const p = document.getElementById(`p${n}`);
        if(p) p.classList.add('active');
        
        const l = document.getElementById(`l${n}`);
        if(l) l.classList.add('active');
        
        const m = document.getElementById(`m${n}`);
        if(m) m.classList.add('active');
        
        const pb = document.getElementById('p-bar');
        if(pb) pb.style.width = (n * 20) + '%';
        
        const st = document.getElementById('s-txt');
        if(st) st.innerText = `Psg ${n} de 5`;
        
        window.AppGlobal.cur = n; 
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        if(n === 5) setTimeout(Sig.resize, 300);
        if(n === 6) { 
            document.querySelectorAll('.sidebar, .mobile-nav, .top-progress, .step-txt').forEach(el => el.style.display = 'none');
            const pok = document.getElementById('p-ok');
            if(pok) pok.classList.add('active');
        }
    }
};
