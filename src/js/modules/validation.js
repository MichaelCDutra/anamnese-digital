export const Validation = {
    check: (el) => {
        if(el.required && !el.value.trim()) { 
            el.classList.add('invalid'); 
            el.classList.remove('valid'); 
            return false; 
        }
        if(el.value.trim()) { 
            el.classList.remove('invalid'); 
            el.classList.add('valid'); 
            return true; 
        }
        el.classList.remove('invalid', 'valid'); 
        return true;
    },
    step: (n) => {
        const p = document.getElementById(`p${n}`);
        if(!p) return true;
        const els = p.querySelectorAll('[required]');
        let ok = true; 
        els.forEach(el => { 
            if(!Validation.check(el)) ok = false; 
        });
        return ok;
    },
    checkAll: () => {
        for(let i=1; i<=5; i++) { 
            if(!Validation.step(i)) return i; 
        }
        return 0;
    },
    age: (el) => {
        const d = new Date(el.value); 
        if(isNaN(d)) return;
        const a = new Date(Date.now() - d.getTime()).getUTCFullYear() - 1970;
        const w = document.getElementById('wrap-resp');
        const r = document.getElementById('responsavel');
        if(!w || !r) return;
        
        if(a < 18) { 
            w.style.display = 'block'; 
            r.required = true; 
        } 
        else { 
            w.style.display = 'none'; 
            r.required = false; 
            r.value = ''; 
            Validation.check(r); 
        }
    },
    phone: (e) => {
        let v = e.target.value.replace(/\D/g, "");
        v = v.replace(/^(\d{2})(\d)/g, "($1) $2").replace(/(\d)(\d{4})$/, "$1-$2");
        e.target.value = v.substring(0, 15); 
        Validation.check(e.target);
    }
};
